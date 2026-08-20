import type { ReactNode } from "react";
import { ui } from "../../content/site.ts";
import type { LoadState } from "../../hooks/useAsync.ts";

type Props<T> = {
  state: LoadState<T[]>;
  emptyMessage: string;
  loadingMessage?: string;
  children: (items: T[]) => ReactNode;
};

export function QueryStatus<T>({
  state,
  emptyMessage,
  loadingMessage = ui.loadingProjects,
  children,
}: Props<T>) {
  if (state.status === "loading") {
    return (
      <p className="text-muted" aria-live="polite">
        {loadingMessage}
      </p>
    );
  }

  if (state.status === "error") {
    return (
      <p role="alert" className="text-accent">
        {ui.dbError} {state.message}
      </p>
    );
  }

  if (state.data.length === 0) {
    return <p className="text-muted">{emptyMessage}</p>;
  }

  return children(state.data);
}
