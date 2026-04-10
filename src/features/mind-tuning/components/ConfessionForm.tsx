import { useState } from "react";

import type { ConfessionFormProps } from "../types/mindTuning.types";

export default function ConfessionForm({
  onSubmit,
  isSubmitting = false,
  initialValue = "",
  placeholder = "지금 마음을 짓누르는 생각은 무엇인가요?",
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
      <textarea
        className={`confession-input ${error ? "is-error" : ""}`}
        placeholder={placeholder}
        value={text}
        onChange={(event) => setText(event.target.value)}
        disabled={isSubmitting}
      />

      <button className="primary-button" onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? "구조 중..." : "구조 요청"}
      </button>
    </>
  );
}
