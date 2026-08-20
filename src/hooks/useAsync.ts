import { useEffect, useState } from "react";

export type LoadState<T> =
  | { status: "loading" }
  | { status: "ready"; data: T }
  | { status: "error"; message: string };

export function useAsync<T>(key: string, loader: () => Promise<T>): LoadState<T> {
  const [snapshot, setSnapshot] = useState<{ key: string; state: LoadState<T> }>({
    key,
    state: { status: "loading" },
  });

  if (snapshot.key !== key) {
    setSnapshot({ key, state: { status: "loading" } });
  }

  useEffect(() => {
    let cancelled = false;

    loader()
      .then((data) => {
        if (!cancelled) setSnapshot({ key, state: { status: "ready", data } });
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setSnapshot({
            key,
            state: {
              status: "error",
              message: error instanceof Error ? error.message : "Failed to load data",
            },
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [key, loader]);

  return snapshot.key === key ? snapshot.state : { status: "loading" };
}
