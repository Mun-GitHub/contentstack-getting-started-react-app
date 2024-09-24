import Contentstack from "contentstack";
import ContentstackLivePreview from "@contentstack/live-preview-utils";


const getLivePreviewHostByRegion = (region: string) => {
  switch (region) {
    case "US":
      return "rest-preview.contentstack.com";
    case "EU":
      return "eu-rest-preview.contentstack.com";
    case "AZURE_NA":
      return "azure-na-rest-preview.contentstack.com";
    case "AZURE_EU":
      return "azure-eu-rest-preview.contentstack.com";
    default:
      return "rest-preview.contentstack.com";
  }
};
const getHostByRegion = (region: string) => {
  switch (region) {
    case "US":
      return "app.contentstack.com";
    case "EU":
      return "eu-app.contentstack.com";
    case "AZURE_NA":
      return "azure-na-app.contentstack.com";
    case "AZURE_EU":
      return "azure-eu-app.contentstack.com";
    case "GCP_NA":
      return "gcp-na-api.contentstack.com";
    default:
      return "app.contentstack.com";
  }
};

export const initializeContentstackSdk = () => {
  const {
    REACT_APP_CONTENTSTACK_API_KEY,
    REACT_APP_CONTENTSTACK_DELIVERY_TOKEN,
    REACT_APP_CONTENTSTACK_ENVIRONMENT,
    REACT_APP_CONTENTSTACK_REGION,
    REACT_APP_CONTENTSTACK_PREVIEW_TOKEN
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
    region: region,
    live_preview: {
      enable: true,
      host: getLivePreviewHostByRegion(REACT_APP_CONTENTSTACK_REGION as string),
      preview_token: REACT_APP_CONTENTSTACK_PREVIEW_TOKEN as string
    }
  });
  ContentstackLivePreview.init({
    stackSdk: Stack
});
  return Stack;
};
export const onEntryChange = ContentstackLivePreview.onEntryChange;