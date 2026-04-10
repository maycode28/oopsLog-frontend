import type { AIResult } from "../types/mindTuning.types";

export const FALLBACK_DATA: AIResult = {
  animals: [
    {
      distortion: "완벽해야만 해",
      perspective: "지금도 충분히 잘하고 있어",
      thanks: "버텨줘서 고마워",
    },
    {
      distortion: "모든 게 내 잘못이야",
      perspective: "상황에는 여러 원인이 함께 있어",
      thanks: "조금은 내려놔도 괜찮아",
    },
    {
      distortion: "앞으로도 계속 이럴 거야",
      perspective: "지금과 미래는 같지 않을 수 있어",
      thanks: "다시 시작할 힘이 있어",
    },
  ],
  title: "감정 구조 완료",
  summary: "지금 마음은 무거운 책임감과 불안이 겹친 상태예요.",
  comfortMessage: "천천히 숨을 고르고, 오늘 할 수 있는 한 가지에만 집중해도 충분해요.",
  actionTip: "5분 타이머를 맞추고 가장 작은 할 일을 먼저 시작해보세요.",
  animalName: "다람쥐",
  animalEmoji: "🐿️",
};

export async function fetchAIData(text: string): Promise<AIResult> {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const trimmed = text.trim();
  if (!trimmed) {
    return FALLBACK_DATA;
  }

  const title = trimmed.length > 16 ? `${trimmed.slice(0, 16)}...` : trimmed;

  return {
    animals: [
      {
        distortion: title,
        perspective: "이 생각이 사실인지, 증거가 무엇인지 차분히 확인해볼 수 있어요.",
        thanks: "마음을 꺼내줘서 고마워요.",
      },
      {
        distortion: "모든 걸 지금 해결해야 해",
        perspective: "한 번에 하나씩 정리해도 충분히 앞으로 갈 수 있어요.",
        thanks: "조급함을 내려놓을 용기가 생겼어요.",
      },
      {
        distortion: "나는 늘 부족해",
        perspective: "이미 해낸 것도 분명히 있고, 성장 중인 과정이에요.",
        thanks: "다시 해볼 마음이 생겼어요.",
      },
    ],
    title,
    summary: "마음을 표현한 것만으로도 감정의 압력이 조금 낮아졌어요.",
    comfortMessage: "지금의 감정은 지나가는 파도처럼 변할 수 있어요.",
    actionTip: "지금 떠오르는 걱정 1개를 적고, 반박 근거 1개를 적어보세요.",
    animalName: "올빼미",
    animalEmoji: "🦉",
  };
}
