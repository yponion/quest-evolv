"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAiAnalysis } from "@/hooks/useAiAnalysis";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { handleApiError } from "@/lib/handleApiError";
import Loading from "@/components/Loading";

export default function AiModal() {
  const router = useRouter();
  const { aiAnalysisData, isLoading, error } = useAiAnalysis({});
  const queryClient = useQueryClient();

  useEffect(() => {
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
          <DialogTitle>{isLoading ? "AI 분석 중..." : "AI 분석 결과"}</DialogTitle>
          <DialogDescription>{isLoading ? help : processing_time_s}</DialogDescription>
        </DialogHeader>
        {isLoading ? <Loading /> : <p>{content}</p>}
      </DialogContent>
    </Dialog>
  );
}
