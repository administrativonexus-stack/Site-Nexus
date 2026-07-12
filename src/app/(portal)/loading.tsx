import { Skeleton } from "@/components/ui/skeleton";

// Next.js wraps the `children` slot of (portal)/layout.tsx in a Suspense
// boundary using this file — Sidebar/ProfileDropdown (already resolved by
// the layout's own auth check) stay mounted, only the page content below
// swaps to this while dashboard/profile/settings/admin do their own async
// Supabase calls. Generic on purpose since it's shared across all of them.
export default function PortalLoading() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-24 rounded-xl" />
        <Skeleton className="h-24 rounded-xl" />
        <Skeleton className="h-24 rounded-xl" />
        <Skeleton className="h-24 rounded-xl" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Skeleton className="h-64 rounded-xl" />
        <Skeleton className="h-64 rounded-xl" />
      </div>
    </div>
  );
}
