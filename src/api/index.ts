import { Dispatch } from "react";
import { CONTENT_TYPES, LocaleCode } from "../constants";
import {
  setFooterData,
  setHeaderData,
  setHomePageData,
  setMenuPageData,
} from "../reducer";
import { initializeContentstackSdk } from "../sdk/utils";
import * as Utils from "@contentstack/utils";
import { addEditableTags } from "@contentstack/utils";

const Stack = initializeContentstackSdk();

type GetEntryByUrl = {
  entryUrl: string | undefined;
  contentTypeUid: string;
  referenceFieldPath: string[] | undefined;
  jsonRtePath: string[] | undefined;
  locale: LocaleCode;
};

const renderOption = {
  span: (node: any, next: any) => next(node.children),
};

export const getEntry = (contentType: string, locale: LocaleCode) => {
  const Query = Stack.ContentType(contentType).Query().addQuery("include_fallback", "true");
  return Query.language(locale)
    .toJSON()
    .find()
    .then((entry) => {
      return entry;
    })
    .catch((err: any) => {
      return {};
    });
};

export const getEntryByUrl = ({
  contentTypeUid,
  entryUrl,
  referenceFieldPath,
  jsonRtePath,
  locale,
}: GetEntryByUrl) => {
  return new Promise((resolve, reject) => {
    const blogQuery = Stack.ContentType(contentTypeUid).Query().addQuery("include_fallback", "true");
    blogQuery.language(locale);
    if (referenceFieldPath) blogQuery.includeReference(referenceFieldPath);
    blogQuery.toJSON();
    const data = blogQuery.where("url", `${entryUrl}`).find();
    data.then(
      (result) => {
        jsonRtePath &&
          Utils.jsonToHTML({
            entry: result,
            paths: jsonRtePath,
            renderOption,
          });
        resolve(result[0]);
      },
      (error) => {
        console.error(error);
        reject(error);
      }
    );
  });
};

export const fetchHeaderData = async (
  dispatch: Dispatch<any>,
  locale: LocaleCode
): Promise<void> => {
  const data = await getEntry(CONTENT_TYPES.HEADER, locale);
  addEditableTags(data[0][0], CONTENT_TYPES.HEADER, true, locale);
  dispatch(setHeaderData(data[0][0]));
};

export const fetchFooterData = async (
  dispatch: Dispatch<any>,
  locale: LocaleCode
): Promise<void> => {
  const data = await getEntry(CONTENT_TYPES.FOOTER, locale);
  addEditableTags(data[0][0], CONTENT_TYPES.FOOTER, true, locale);
  dispatch(setFooterData(data[0][0]));
};

export const fetchHomePageData = async (
  dispatch: Dispatch<any>,
  locale: LocaleCode
): Promise<void> => {
  const data: any = await getEntryByUrl({
    contentTypeUid: CONTENT_TYPES.PAGE,
    entryUrl: "/",
    referenceFieldPath: undefined,
    jsonRtePath: undefined,
    locale,
  });
  addEditableTags(data[0], CONTENT_TYPES.PAGE, true, locale);
  dispatch(setHomePageData(data[0]));
};

export const fetchInitialData = async (
  dispatch: Dispatch<any>,
  setLoading: (status: boolean) => void,
  locale: LocaleCode
): Promise<void> => {
  try {
    await Promise.all([
      fetchHeaderData(dispatch, locale),
      fetchFooterData(dispatch, locale),
      fetchHomePageData(dispatch, locale),
    ]);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const fetchMenuPageData = async (
  dispatch: Dispatch<any>,
  setLoading: (status: boolean) => void,
  locale: LocaleCode
): Promise<void> => {
  const data: any = await getEntryByUrl({
    contentTypeUid: CONTENT_TYPES.PAGE,
    entryUrl: "/menu",
    referenceFieldPath: ["sections.menu.course.dishes"],
    jsonRtePath: undefined,
    locale,
  });
  addEditableTags(data[0], CONTENT_TYPES.PAGE, true, locale);
  dispatch(setMenuPageData(data[0].sections[0].menu.course));
  setLoading(false);
};
