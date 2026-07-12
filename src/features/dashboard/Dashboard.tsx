import { Badge } from "@/components/ui/badge";
import { StatsGrid } from "@/features/dashboard/StatsGrid";
import { ListWidget, ListWidgetItem } from "@/features/dashboard/ListWidget";
import { ActiveProjects } from "@/features/dashboard/ActiveProjects";
import {
  RECENT_ACTIVITY,
  RECENT_CONVERSATIONS,
  RECENT_LEADS,
  UPCOMING_MEETINGS,
} from "@/features/dashboard/constants";

export function Dashboard({ userEmail }: { userEmail: string }) {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-foreground text-2xl font-semibold">Bem-vindo, {userEmail}</h1>
        <p className="text-muted-foreground text-description mt-1">
          Resumo da sua operação — dados de exemplo até o CRM (Fase 8) entrar no ar.
        </p>
      </div>

      <StatsGrid />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ListWidget title="Últimos Leads">
          {RECENT_LEADS.map((lead) => (
            <ListWidgetItem
              key={lead.name}
              primary={lead.name}
              secondary={lead.company}
              trailing={<Badge variant="outline">{lead.status}</Badge>}
            />
          ))}
        </ListWidget>

        <ListWidget title="Conversas">
          {RECENT_CONVERSATIONS.map((conversation) => (
            <ListWidgetItem
              key={conversation.name}
              primary={conversation.name}
              secondary={conversation.preview}
              trailing={<span className="text-muted-foreground text-xs">{conversation.time}</span>}
            />
          ))}
        </ListWidget>

        <ListWidget title="Reuniões">
          {UPCOMING_MEETINGS.map((meeting) => (
            <ListWidgetItem
              key={meeting.title}
              primary={meeting.title}
              secondary={meeting.withWhom}
              trailing={<span className="text-muted-foreground text-xs">{meeting.when}</span>}
            />
          ))}
        </ListWidget>

        <ActiveProjects />
      </div>

      <ListWidget title="Atividades recentes">
        {RECENT_ACTIVITY.map((activity) => (
          <ListWidgetItem key={activity.text} primary={activity.text} secondary={activity.time} />
        ))}
      </ListWidget>
    </div>
  );
}
