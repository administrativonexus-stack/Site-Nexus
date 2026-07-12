import { Card, CardContent } from "@/components/ui/card";
import { DASHBOARD_STATS } from "@/features/dashboard/constants";

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {DASHBOARD_STATS.map((stat) => (
        <Card key={stat.label}>
          <CardContent>
            <p className="text-muted-foreground text-caption">{stat.label}</p>
            <p className="text-foreground mt-1 text-2xl font-semibold">{stat.value}</p>
            <p className="text-muted-foreground mt-1 text-xs">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
