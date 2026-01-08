import { ApiResponse } from "./common"

type AiAnalysisData = {
  analysis_id: string,
  type: string,
  content: string,
}

export type AiAnalysisRequest = {
  input?: string
}

export type AiAnalysisResponse = ApiResponse<AiAnalysisData> & {
  input: string,
  processing_time_ms: number
};