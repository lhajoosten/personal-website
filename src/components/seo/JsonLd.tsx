import type { JsonLd } from "../../seo/json-ld.ts";

export function JsonLdScript({ data }: { data: JsonLd }) {
  const json = JSON.stringify(data).replaceAll("<", "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
