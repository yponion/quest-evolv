import { GenericAbortSignal } from 'axios';
import httpClient from './config';
import { AiAnalysisRequest, AiAnalysisResponse } from '@/types/aiAnalysis';

/** AI 분석 관련 API */
export const aiAnalysisApi = {
  /** AI 분석 데이터 조회 */
  aiAnalysis: (request: AiAnalysisRequest, signal: GenericAbortSignal) =>
    httpClient.post<AiAnalysisResponse>('/ai-analysis', request, { timeout: 70_000, signal }),
}