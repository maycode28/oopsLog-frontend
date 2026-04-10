export type AnimalData = {
  distortion: string;
  perspective: string;
  thanks: string;
};

export type AIResult = {
  animals: AnimalData[];
};

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
};

export async function fetchAIData(text: string): Promise<AIResult> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    const trimmed = text.trim();
    if (!trimmed) {
      return FALLBACK_DATA;
    }

    return {
      animals: [
        {
          distortion: trimmed.length > 16 ? `${trimmed.slice(0, 16)}...` : trimmed,
          perspective: "생각과 사실은 다를 수 있어",
          thanks: "털어놔줘서 고마워",
        },
        {
          distortion: "모든 게 끝난 거야",
          perspective: "지금은 과정의 한 장면일 뿐이야",
          thanks: "숨을 고르고 다시 보자",
        },
        {
          distortion: "나는 늘 부족해",
          perspective: "이미 충분한 강점이 있어",
          thanks: "천천히 나아가도 괜찮아",
        },
      ],
    };
  } catch (error) {
    console.error(error);
    return FALLBACK_DATA;
  }
}
