import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ListWidget({
  title,
  emptyLabel,
  children,
}: {
  title: string;
  emptyLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-3">{children}</ul>
        {emptyLabel && <p className="text-muted-foreground text-description">{emptyLabel}</p>}
      </CardContent>
    </Card>
  );
}

export function ListWidgetItem({
  primary,
  secondary,
  trailing,
}: {
  primary: string;
  secondary: string;
  trailing?: React.ReactNode;
}) {
  return (
    <li className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-foreground truncate text-sm font-medium">{primary}</p>
        <p className="text-muted-foreground truncate text-xs">{secondary}</p>
      </div>
      {trailing}
    </li>
  );
}
