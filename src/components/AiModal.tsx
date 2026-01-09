"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAiAnalysis } from "@/hooks/useAiAnalysis";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { handleApiError } from "@/lib/handleApiError";

export default function AiModal() {
  const router = useRouter();
  const { aiAnalysisData, isLoading, error } = useAiAnalysis({});
  const queryClient = useQueryClient();

  useEffect(() => {
    // todo: 매개변수로 해당글의 customerId 를 던지면 캐싱할만 한데, 랜덤한 analysis 가 선택되어 반환 되기 때문에 언마운트되면 값을 지워줘서 매번 새로운 값을 보장하게 하였는데, 문제의 의도가 맞는지 더 고민 필요
    return () => queryClient.removeQueries({ queryKey: ["aiAnalysisApi.aiAnalysis"] });
  }, [queryClient]);

  const data = aiAnalysisData?.data;
  const processing_time_s = aiAnalysisData?.processing_time_ms
    ? Math.round(aiAnalysisData.processing_time_ms / 1000) + "초 소요됨"
    : null;
  const analysisId = data?.analysis_id ?? "-";
  const content = data?.content ?? "-";
  const type = data?.type ?? "-";

  const help = "AI 분석은 최대 1분 가량의 시간이 소요됩니다.";

  if (error) handleApiError(error);

  return (
    <Dialog
      open
      onOpenChange={() => {
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "customersApi.getCustomerDetail",
        });
        router.back();
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>AI 분석</DialogTitle>
          <DialogDescription>{isLoading ? help : processing_time_s}</DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        ) : (
          <div>{content}</div>
        )}
      </DialogContent>
    </Dialog>
  );
}
