import { useState } from "react";

import type { ConfessionFormProps } from "../types/mindTuning.types";

export default function ConfessionForm({
  onSubmit,
  errorMessage,
  isSubmitting = false,
  initialValue = "",
  placeholder = "예: 오늘 회의에서 내 의견이 묻힌 것 같았어. 그때 나는 내가 도움이 안 되는 사람처럼 느껴졌어. 지금은 불안해서 다음 회의도 망칠까 걱정돼.",
}: ConfessionFormProps) {
  const [text, setText] = useState(initialValue);
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) {
      setError(true);
      setTimeout(() => setError(false), 700);
      return;
    }

    await onSubmit(text);
  };

  return (
    <>
      <div className="confession-guide" aria-live="polite">
        <p className="confession-guide__title">이렇게 적으면 동물 친구들을 더 잘 찾을 수 있어요.</p>
        <p className="confession-guide__body">
          오늘 어떤 일이 있었는지, 그때 어떻게 받아들였는지, 지금 어떤 감정과 걱정으로 이어지는지를 자연스럽게 적어 주세요.
        </p>
      </div>

      <textarea
        className={`confession-input ${error ? "is-error" : ""}`}
        placeholder={placeholder}
        value={text}
        onChange={(event) => setText(event.target.value)}
        disabled={isSubmitting}
      />

      <button className="primary-button" onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? "동물 친구들을 찾는 중..." : "도와주러 가기"}
      </button>

      {errorMessage ? <p className="form-error-message">{errorMessage}</p> : null}
    </>
  );
}
