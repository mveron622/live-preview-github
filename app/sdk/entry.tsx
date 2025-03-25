"use client";
/* eslint-disable @typescript-eslint/ban-ts-comment */

import * as Utils from "@contentstack/utils";
import ContentstackLivePreview from "@contentstack/live-preview-utils";
import {
  customHostUrl,
  initializeContentStackSdk,
  isValidCustomHostUrl,
} from "./utils";

type GetEntry = {
  contentTypeUid: string;
  referenceFieldPath: string[] | undefined;
  jsonRtePath: string[] | undefined;
};

type GetEntryByUrl = {
  entryUrl: string | undefined;
  contentTypeUid: string;
  referenceFieldPath: string[] | undefined;
  jsonRtePath: string[] | undefined;
};

type GetEntryByUID = {
  contentTypeUid: string;
  entryUid: string;
  referenceFieldPath: string[] | undefined;
  jsonRtePath: string[] | undefined;
};

export const NEXT_PUBLIC_CONTENTSTACK_API_KEY =
  process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY;
export const NEXT_PUBLIC_CONTENTSTACK_APP_HOST =
  process.env.NEXT_PUBLIC_CONTENTSTACK_APP_HOST;
export const NEXT_PUBLIC_CONTENTSTACK_API_HOST =
  process.env.NEXT_PUBLIC_CONTENTSTACK_API_HOST;

const customHostBaseUrl = NEXT_PUBLIC_CONTENTSTACK_API_HOST
  ? customHostUrl(NEXT_PUBLIC_CONTENTSTACK_API_HOST as string)
  : "";

// SDK initialization
const Stack = initializeContentStackSdk();

// set host url only for custom host or non prod base url's
if (customHostBaseUrl && isValidCustomHostUrl(customHostBaseUrl)) {
  Stack.setHost(customHostBaseUrl);
}

// Setting LP if enabled
ContentstackLivePreview.init({
  //@ts-ignore
  stackSdk: Stack,
  clientUrlParams: {
    host: NEXT_PUBLIC_CONTENTSTACK_APP_HOST,
  },
})?.catch((error) => console.error(error));

export const { onEntryChange } = ContentstackLivePreview;

const renderOption = {
  span: (node: any, next: any) => next(node.children),
};

/**
 *
 * fetches all the entries from specific content-type
 * @param {* content-type uid} contentTypeUid
 * @param {* reference field name} referenceFieldPath
 * @param {* Json RTE path} jsonRtePath
 *
 */
export const getEntry = ({
  contentTypeUid,
  referenceFieldPath,
  jsonRtePath,
}: GetEntry) => {
  return new Promise((resolve, reject) => {
    const query = Stack.ContentType(contentTypeUid).Query();
    if (referenceFieldPath) query.includeReference(referenceFieldPath);
    query
      .toJSON()
      .find()
      .then(
        (result) => {
          jsonRtePath &&
            Utils.jsonToHTML({
              entry: result,
              paths: jsonRtePath,
              renderOption,
            });
          resolve(result);
        },
        (error) => {
          reject(error);
        }
      );
  });
};

/**
 *fetches specific entry from a content-type
 *
 * @param {* content-type uid} contentTypeUid
 * @param {* url for entry to be fetched} entryUrl
 * @param {* reference field name} referenceFieldPath
 * @param {* Json RTE path} jsonRtePath
 * @returns
 */
export const getEntryByUrl = ({
  contentTypeUid,
  entryUrl,
  referenceFieldPath,
  jsonRtePath,
}: GetEntryByUrl) => {
  return new Promise((resolve, reject) => {
    const blogQuery = Stack.ContentType(contentTypeUid).Query();
    if (referenceFieldPath) blogQuery.includeReference(referenceFieldPath);
    blogQuery.toJSON();
    const data = blogQuery.where("url", `/${entryUrl}`).find();
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

/**
 * Fetches a specific entry by its UID from a content-type
 * 
 * @param {* content-type uid} contentTypeUid
 * @param {* entry uid} entryUid
 * @param {* reference field name} referenceFieldPath
 * @param {* Json RTE path} jsonRtePath
 * @returns Promise resolving to the entry
 */
export const getEntryByUID = ({
  contentTypeUid,
  entryUid,
  referenceFieldPath,
  jsonRtePath,
}: GetEntryByUID) => {
  return new Promise((resolve, reject) => {
    const query = Stack.ContentType(contentTypeUid).Entry(entryUid);
    if (referenceFieldPath) query.includeReference(referenceFieldPath);

    query
      .toJSON()
      .fetch()
      .then(
        (result) => {
          jsonRtePath &&
            Utils.jsonToHTML({
              entry: result,
              paths: jsonRtePath,
              renderOption,
            });
          resolve(result);
        },
        (error) => {
          console.error('Error fetching entry:', error);
          reject(error);
        }
      );
  });
};
