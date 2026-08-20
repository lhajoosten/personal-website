export type ReseedInput = {
  empty: boolean;
  storedRevision: number | null;
  contentRevision: number;
};

export function shouldReseed(input: ReseedInput): boolean {
  if (input.empty) return true;
  if (input.storedRevision === null) return true;
  return input.storedRevision !== input.contentRevision;
}

export function opfsSupported(): boolean {
  return (
    typeof navigator !== "undefined" &&
    "storage" in navigator &&
    "getDirectory" in navigator.storage
  );
}
