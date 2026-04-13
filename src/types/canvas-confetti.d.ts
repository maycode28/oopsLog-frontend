declare module 'canvas-confetti' {
  interface ConfettiOrigin {
    x?: number;
    y?: number;
  }

  interface ConfettiOptions {
    particleCount?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    scalar?: number;
    colors?: string[];
    origin?: ConfettiOrigin;
    zIndex?: number;
  }

  type ConfettiFn = (options?: ConfettiOptions) => Promise<null> | null;

  const confetti: ConfettiFn;
  export default confetti;
}
