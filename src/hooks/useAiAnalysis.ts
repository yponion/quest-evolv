import { useQuery } from '@tanstack/react-query';
import { aiAnalysisApi } from '@/apis/aiAnalysis';
import { AiAnalysisRequest } from '@/types/aiAnalysis';

export const useAiAnalysis = (request: AiAnalysisRequest) => {
  const { data, isLoading, error, } = useQuery({
    queryKey: ['aiAnalysisApi.aiAnalysis', request],
    queryFn: async ({ signal }) => aiAnalysisApi.aiAnalysis(request, signal),
    staleTime: 5 * 60 * 1000
  });

  return {
    aiAnalysisData: data?.data,
    isLoading,
    error
  }
};
