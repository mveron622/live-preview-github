"use client";

import { Config, Region, LivePreview, Stack } from "contentstack";

// Construct all needed environment variables from above individually
export const NEXT_PUBLIC_CONTENTSTACK_API_KEY =
  process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY;
export const NEXT_PUBLIC_CONTENTSTACK_APP_HOST =
  process.env.NEXT_PUBLIC_CONTENTSTACK_APP_HOST;
export const NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN =
  process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN;
export const NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT =
  process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT;
export const NEXT_PUBLIC_CONTENTSTACK_BRANCH =
  process.env.NEXT_PUBLIC_CONTENTSTACK_BRANCH;
export const NEXT_PUBLIC_CONTENTSTACK_REGION =
  process.env.NEXT_PUBLIC_CONTENTSTACK_REGION;
export const NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN =
  process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN;
export const NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW =
  process.env.NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW;
export const NEXT_PUBLIC_CONTENTSTACK_PREVIEW_HOST =
  process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_HOST;

// basic env validation
export const isBasicConfigValid = () => {
  return (
    !!NEXT_PUBLIC_CONTENTSTACK_API_KEY &&
    !!NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN &&
    !!NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT
  );
};
// Live preview config validation
export const isLpConfigValid = () => {
  return (
    !!NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW &&
    !!NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN &&
    !!NEXT_PUBLIC_CONTENTSTACK_PREVIEW_HOST &&
    !!NEXT_PUBLIC_CONTENTSTACK_APP_HOST
  );
};
// set region
const setRegion = (): Region => {
  let region = "US" as keyof typeof Region;
  if (
    !!NEXT_PUBLIC_CONTENTSTACK_REGION &&
    NEXT_PUBLIC_CONTENTSTACK_REGION !== "us"
  ) {
    region = NEXT_PUBLIC_CONTENTSTACK_REGION.toLocaleUpperCase().replace(
      "-",
      "_"
    ) as keyof typeof Region;
  }
  return Region[region];
};
// set LivePreview config
const setLivePreviewConfig = (): LivePreview => {
  if (!isLpConfigValid())
    throw new Error(
      "Your LP config is set to true. Please make you have set all required LP config in .env"
    );
  return {
    preview_token: NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN as string,
    enable: (NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW as string) === "true",
    host: NEXT_PUBLIC_CONTENTSTACK_PREVIEW_HOST as string,
  } as LivePreview;
};
// contentstack sdk initialization
export const initializeContentStackSdk = (): Stack => {
  if (!isBasicConfigValid())
    throw new Error("Please set your .env file before running starter app");
  const stackConfig: Config = {
    api_key: NEXT_PUBLIC_CONTENTSTACK_API_KEY as string,
    delivery_token: NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN as string,
    environment: NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT as string,
    region: setRegion(),
    branch: NEXT_PUBLIC_CONTENTSTACK_BRANCH || "main",
  };
  if (NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW === "true") {
    stackConfig.live_preview = setLivePreviewConfig();
  }
  return Stack(stackConfig);
};
// api host url
export const customHostUrl = (baseUrl = ""): string => {
  return baseUrl.replace("api", "cdn");
};
// generate prod api urls
export const generateUrlBasedOnRegion = (): string[] => {
  return Object.keys(Region).map((region) => {
    if (region === "US") {
      return `cdn.contentstack.io`;
    }
    return `${region}-cdn.contentstack.com`;
  });
};
// prod url validation for custom host
export const isValidCustomHostUrl = (url: string): boolean => {
  return url ? !generateUrlBasedOnRegion().includes(url) : false;
};
