import type { Plugin } from "@docusaurus/types";

export type UmamiAnalyticsOptions = {
  websiteId: string;
  src: string;
};

export default function umamiAnalyticsPlugin(
  _context: unknown,
  options: UmamiAnalyticsOptions
): Plugin {
  const { websiteId, src } = options;

  if (!websiteId || !src) {
    return { name: "umami-analytics" };
  }

  return {
    name: "umami-analytics",
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: "script",
            attributes: {
              async: true,
              defer: true,
              "data-website-id": websiteId,
              src,
            },
          },
        ],
      };
    },
  };
}
