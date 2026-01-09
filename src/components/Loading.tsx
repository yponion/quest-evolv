import { Skeleton } from "./ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col space-y-3 p-4">
      <Skeleton className="h-16 w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
}
