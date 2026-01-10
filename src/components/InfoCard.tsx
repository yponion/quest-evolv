import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

export default function InfoCard({
  title,
  contents,
  isLoading,
}: {
  title: string;
  contents: object[];
  isLoading: boolean;
}) {
  return (
    <Card className="min-w-72">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 text-sm">
          {contents.map(({ key, value }) => (
            <div key={key} className="flex items-center justify-between pb-2 not-last:border-b">
              <span>{key}</span>
              <span className="font-medium">{isLoading ? <Spinner /> : value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
