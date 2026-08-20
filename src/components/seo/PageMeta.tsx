import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { formatCanonicalUrl, formatPageTitle } from "../../config/page-meta.ts";
import { siteConfig } from "../../config/site.config.ts";

type PageMetaProps = {
  title?: string;
  description?: string;
  path?: string;
  type?: "website" | "article";
};

function upsertMeta(selector: string, attribute: string, name: string, content: string) {
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attribute, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function PageMeta({ title, description, path, type = "website" }: PageMetaProps) {
  const location = useLocation();
  const documentTitle = formatPageTitle(title);
  const canonical = formatCanonicalUrl(path ?? location.pathname);
  const ogImage = `${siteConfig.url}/og.svg`;

  useEffect(() => {
    document.title = documentTitle;

    if (description) {
      upsertMeta('meta[name="description"]', "name", "description", description);
      upsertMeta('meta[property="og:description"]', "property", "og:description", description);
      upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    }

    upsertMeta('meta[property="og:title"]', "property", "og:title", documentTitle);
    upsertMeta('meta[property="og:url"]', "property", "og:url", canonical);
    upsertMeta('meta[property="og:type"]', "property", "og:type", type);
    upsertMeta('meta[property="og:image"]', "property", "og:image", ogImage);
    upsertMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary");
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", documentTitle);

    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonical);
  }, [canonical, description, documentTitle, ogImage, type]);

  return null;
}
