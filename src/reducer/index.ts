import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TFooterData, THeaderData, THomePageData, TMenu } from "../types";
import { DEFAULT_LOCALE, LocaleCode } from "../constants";

interface AppState {
  locale: LocaleCode;
  headerData: THeaderData;
  footerData: TFooterData;
  homePageData: THomePageData;
  menuPageData: TMenu[];
}

const initialState: AppState = {
  locale: DEFAULT_LOCALE,
  headerData: {
    logo: {
      $: {
        url: {
          "data-cslp": "",
        },
      },
      url: "",
    },
    navigation_links: {
      link: [
        {
          $: {
            title: {
              "data-cslp": "",
            },
            href: {
              "data-cslp": "",
            },
          },
          href: "",
          title: "",
        },
      ],
    },
  },
  footerData: {
    $: {
      copyright: {
        "data-cslp": "",
      },
    },
    navigation_links: {
      $: {
        title: {
          "data-cslp": "",
        },
      },
      title: "",
      link: [
        {
          $: {
            title: {
              "data-cslp": "",
            },
            href: {
              "data-cslp": "",
            },
          },
          href: "",
          title: "",
        },
      ],
    },
    information_section: {
      $: {
        descrption: {
          "data-cslp": "",
        },
        timings: {
          "data-cslp": "",
        },
        holiday: {
          "data-cslp": "",
        },
      },
      logo: {
        $: {
          url: {
            "data-cslp": "",
          },
        },
        url: "",
      },
      descrption: "",
      timings: "",
      holiday: "",
    },
    copyright: "",
  },
  homePageData: {
    sections: [
      {
        home: {
          hero_section: {
            $: {
              heading: {
                "data-cslp": "",
              },
              description: {
                "data-cslp": "",
              },
              primary_cta: {
                "data-cslp": "",
              },
            },
            banner: {
              $: {
                url: {
                  "data-cslp": "",
                },
              },
              url: "",
            },
            heading: "",
            description: "",
            primary_cta: "",
          },
        },
      },
    ],
  },
  menuPageData: [
    {
      $: {
        course_name: {
          "data-cslp": "",
        },
      },
      course_name: "",
      dishes: [
        {
          $: {
            title: {
              "data-cslp": "",
            },
            description: {
              "data-cslp": "",
            },
            price: {
              "data-cslp": "",
            },
          },
          uid: "",
          image: {
            $: {
              url: {
                "data-cslp": "",
              },
            },
            url: "",
          },
          title: "",
          description: "",
          price: 0,
        },
      ],
    },
  ],
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setLocale: (state, action: PayloadAction<LocaleCode>) => {
      state.locale = action.payload;
    },
    setHeaderData: (state, action: PayloadAction<THeaderData>) => {
      state.headerData = action.payload;
    },
    setFooterData: (state, action: PayloadAction<TFooterData>) => {
      state.footerData = action.payload;
    },
    setHomePageData: (state, action: PayloadAction<THomePageData>) => {
      state.homePageData = action.payload;
    },
    setMenuPageData: (state, action: PayloadAction<TMenu[]>) => {
      state.menuPageData = action.payload;
    },
  },
});

export const {
  setLocale,
  setHeaderData,
  setFooterData,
  setHomePageData,
  setMenuPageData,
} = mainSlice.actions;

export default mainSlice.reducer;
