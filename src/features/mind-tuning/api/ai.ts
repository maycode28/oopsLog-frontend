import { getSessionUserId } from '../../auth/utils/session';
import { requestJson } from '../../../services/api/http';
import type { AIResult } from '../types/mindTuning.types';
import { mapAnalyzeResponseToAIResult } from './mapper';
import type { AnalyzeRequest, AnalyzeResponseDto } from './types';

const ANALYZE_TIMEOUT_MS = 15000;

export async function fetchAIData(text: string): Promise<AIResult> {
  const trimmed = text.trim();
  if (!trimmed) {
    throw new Error('Please enter text to analyze.');
  }

  const userId = getSessionUserId();
  if (!userId) {
    throw new Error('Login is required. Please sign in again.');
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), ANALYZE_TIMEOUT_MS);

  try {
    const data = await requestJson<AnalyzeResponseDto>(`/api/analyses/${userId}/analyze`, {
      method: 'POST',
      body: JSON.stringify({ text: trimmed } satisfies AnalyzeRequest),
      signal: controller.signal,
    });

    return mapAnalyzeResponseToAIResult(data);
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('The analysis request timed out. Please try again.');
    }

    throw error instanceof Error ? error : new Error('An error occurred while analyzing.');
  } finally {
    window.clearTimeout(timeoutId);
  }
}
