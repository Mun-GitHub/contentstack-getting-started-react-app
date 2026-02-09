import Contentstack from "contentstack";
import ContentstackLivePreview from "@contentstack/live-preview-utils";

const getModifiedHost = (baseHost: string, hostEnv?: string) => {
  if (hostEnv) {
    const [subdomain] = baseHost.split(".");
    return `${hostEnv}-${subdomain}.csnonprod.com`;
  }
  return baseHost;
};


const getLivePreviewHostByRegion = (region: string, hostEnv?: string) => {
  let baseHost: string;
  switch (region) {
    case "US":
      baseHost = "rest-preview.contentstack.com";
      break;
    case "EU":
      baseHost = "eu-rest-preview.contentstack.com";
      break;
    case "AZURE_NA":
      baseHost = "azure-na-rest-preview.contentstack.com";
      break;
    case "AZURE_EU":
      baseHost = "azure-eu-rest-preview.contentstack.com";
      break;
    default:
      baseHost = "rest-preview.contentstack.com";
  }
  return getModifiedHost(baseHost, hostEnv);
};
const getHostByRegion = (region: string, hostEnv?: string) => {
  let baseHost: string;
  switch (region) {
    case "US":
      baseHost = "app.contentstack.com";
      break;
    case "EU":
      baseHost = "eu-app.contentstack.com";
      break;
    case "AZURE_NA":
      baseHost = "azure-na-app.contentstack.com";
      break;
    case "AZURE_EU":
      baseHost = "azure-eu-app.contentstack.com";
      break;
    case "GCP_NA":
      baseHost = "gcp-na-api.contentstack.com";
      break;
    default:
      baseHost = "app.contentstack.com";
  }
  return getModifiedHost(baseHost, hostEnv);
};

export const initializeContentstackSdk = () => {
  const {
    REACT_APP_CONTENTSTACK_API_KEY,
    REACT_APP_CONTENTSTACK_DELIVERY_TOKEN,
    REACT_APP_CONTENTSTACK_ENVIRONMENT,
    REACT_APP_CONTENTSTACK_REGION,
    REACT_APP_CONTENTSTACK_PREVIEW_TOKEN,
    REACT_APP_CONTENTSTACK_BRANCH,
    REACT_APP_CONTENTSTACK_HOST_ENV
  } = process.env;

  const region: Contentstack.Region | undefined = (function (
    regionValue: string
  ) {
    switch (regionValue) {
      case "US":
        return Contentstack.Region.US;
      case "EU":
        return Contentstack.Region.EU;
      case "AZURE_NA":
        return Contentstack.Region.AZURE_NA;
      case "AZURE_EU":
        return Contentstack.Region.AZURE_EU;
      case "GCP_NA":
        return Contentstack.Region.GCP_NA;
      default:
        return undefined;
    }
  })(REACT_APP_CONTENTSTACK_REGION as string);

  if (!region) {
    throw new Error(
      "Invalid region provided in REACT_APP_CONTENTSTACK_REGION. Valid values are: " +
        Object.keys(Contentstack.Region).join(", ")
    );
  }

  const Stack = Contentstack.Stack({
    api_key: REACT_APP_CONTENTSTACK_API_KEY as string,
    delivery_token: REACT_APP_CONTENTSTACK_DELIVERY_TOKEN as string,
    environment: REACT_APP_CONTENTSTACK_ENVIRONMENT as string,
    branch: REACT_APP_CONTENTSTACK_BRANCH as string,
    region: region,
    live_preview: {
      enable: true,
      host: getLivePreviewHostByRegion(REACT_APP_CONTENTSTACK_REGION as string,REACT_APP_CONTENTSTACK_HOST_ENV),
      preview_token: REACT_APP_CONTENTSTACK_PREVIEW_TOKEN as string,
    },
  });

  Stack.setHost(
    getHostByRegion(
      REACT_APP_CONTENTSTACK_REGION as string,
      REACT_APP_CONTENTSTACK_HOST_ENV
    )
  );

  ContentstackLivePreview.init({
    stackSdk: Stack,
    clientUrlParams: {
      protocol: "https",
      host: getHostByRegion(REACT_APP_CONTENTSTACK_REGION as string,REACT_APP_CONTENTSTACK_HOST_ENV),
      port: 443,
    },
    editButton: {
      enable: true,
      exclude: ["outsideLivePreviewPortal"],
      includeByQueryParameter: true,
      position: "bottom",
    },
  });

  return Stack;
};

export const onEntryChange = ContentstackLivePreview.onEntryChange;
