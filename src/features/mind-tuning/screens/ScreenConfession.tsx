import { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  dir: number;
  onSubmit: (text: string) => void;
};

export default function ScreenConfession({ dir, onSubmit }: Props) {
  const [text, setText] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (!text.trim()) {
      setError(true);
      setTimeout(() => setError(false), 700);
      return;
    }
    onSubmit(text);
  };

  return (
    <motion.div
      key="confession"
      initial={{ x: dir >= 0 ? 60 : -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: dir >= 0 ? -60 : 60, opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="screen confession-screen"
    >
      <div className="screen-inner confession-inner">
        <div className="leaf-icon">🌿</div>
        <h1>마음 고백</h1>
        <p className="subtitle">
          오늘 마음에 무거움이 있다면 여기에 털어놓아 주세요.
          <br />
          작은 숲속 친구들이 함께 들어줄게요.
        </p>

        <textarea
          className={`confession-input ${error ? "is-error" : ""}`}
          placeholder="지금 마음을 짓누르는 생각은 무엇인가요?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button className="primary-button" onClick={handleSubmit}>
          숲 구조 요청
        </button>
      </div>
    </motion.div>
  );
}
