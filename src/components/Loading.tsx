import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

export default function Loading({
  size = "default",
  className,
  ...props
}: { size?: "default" | "big" } & React.ComponentProps<"div">) {
  if (size == "big")
    return (
      <div className={cn("flex flex-col space-y-3 p-4", className)} {...props}>
        <Skeleton className="h-32 w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>
    );

  return (
    <div className={cn("space-y-2", className)} {...props}>
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-1/3" />
    </div>
  );
}
