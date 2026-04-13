const distortionLabelMap: Record<string, string> = {
  Labeling: "낙인찍기",
  "Mental Filter": "부정적 여과",
  Overgeneralization: "과잉 일반화",
  "All-or-Nothing Thinking": "흑백논리",
  Catastrophizing: "파국화",
  Personalization: "개인화",
  "Should Statements": "당위적 사고",
  "Emotional Reasoning": "감정적 추론",
  "Jumping to Conclusions": "성급한 결론",
  "Mind Reading": "독심술",
  "Fortune Telling": "예언하기",
  Magnification: "확대 해석",
  Minimization: "축소 해석",
  "Discounting the Positive": "긍정 축소",
};

export const translateDistortionLabel = (label: string) =>
  distortionLabelMap[label] ?? label;
