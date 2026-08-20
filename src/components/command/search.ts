export type CommandGroup = "page" | "project" | "writing";

export type CommandItem = {
  id: string;
  label: string;
  hint: string;
  to: string;
  group: CommandGroup;
};

export function filterCommandItems(items: CommandItem[], query: string): CommandItem[] {
  const needle = query.trim().toLowerCase();
  if (needle.length === 0) return items;
  return items.filter(
    (item) => item.label.toLowerCase().includes(needle) || item.hint.toLowerCase().includes(needle),
  );
}
