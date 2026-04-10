/**
 * 화면 흐름 이름
 */
export type ScreenName = "confession" | "scanning" | "rescue";

/**
 * 동물 ID
 */
export type AnimalId = "turtle" | "squirrel" | "bird";

/**
 * 구조 화면 단계
 * 0: 초기 (...) 말풍선
 * 1: 인지 왜곡 노출
 * 2: 구조 액션
 * 3: 대안적 사고 노출
 * 4: 감사와 보상
 */
export type RescueStep = 0 | 1 | 2 | 3 | 4;

/**
 * 동물별 AI 응답 데이터
 */
export interface AnimalAIItem {
  distortion?: string;
  perspective?: string;
  thanks?: string;
}

/**
 * 화면에 배치할 동물 기본 정보
 */
export interface AnimalConfig {
  id: AnimalId;
  emoji: string;
  name: string;
}

/**
 * 구조 화면에서 동물 하나가 가지는 상태
 */
export interface AnimalState {
  step: RescueStep;
  data: AnimalAIItem;
}

/**
 * 동물 상태 맵
 */
export type AnimalStateMap = Record<AnimalId, AnimalState>;

/**
 * AI 분석 결과 데이터
 * - 기존 summary/result 카드 UI도 유지 가능
 * - rescue 화면용 animals 배열도 명시적으로 정의
 */
export interface AIResult {
  animals: AnimalAIItem[];

  title: string;
  summary: string;
  comfortMessage: string;

  actionTip?: string;
  animalName?: string;
  animalEmoji?: string;
}

/**
 * useMindTuning 훅이 반환하는 상태/핸들러 타입
 */
export interface UseMindTuningReturn {
  screen: ScreenName;
  aiData: AIResult | null;
  isLoading: boolean;
  dir: number;
  handleConfess: (text: string) => Promise<void>;
  handleRestart: () => void;
}

/**
 * ScreenConfession props
 */
export interface ScreenConfessionProps {
  dir: number;
  onSubmit: (text: string) => void | Promise<void>;
}

/**
 * ScreenScanning props
 */
export interface ScreenScanningProps {
  dir: number;
  isLoading: boolean;
}

/**
 * ScreenRescue props
 */
export interface ScreenRescueProps {
  dir: number;
  aiData: AIResult | null;
  onRestart: () => void;
}

/**
 * ConfessionForm props
 * - ScreenConfession 내부 하위 컴포넌트로 분리할 때 사용
 */
export interface ConfessionFormProps {
  onSubmit: (text: string) => void | Promise<void>;
  isSubmitting?: boolean;
  initialValue?: string;
  placeholder?: string;
}

/**
 * ScanningIndicator props
 * - 로딩 시각 컴포넌트 분리용
 */
export interface ScanningIndicatorProps {
  isLoading: boolean;
  message?: string;
}

/**
 * RescueAnimal props
 * - 동물 단위 컴포넌트 분리 시 사용
 */
export interface RescueAnimalProps {
  animal: AnimalConfig;
  state: AnimalState;
  sparkleSeed: number;
  onClick: () => void;
}

/**
 * 점수 팝업 데이터
 */
export interface ScorePopup {
  id: number;
  value: number;
}

/**
 * 내부 상태를 객체 형태로 관리하고 싶을 때 대비한 타입
 */
export interface MindTuningState {
  screen: ScreenName;
  aiData: AIResult | null;
  isLoading: boolean;
  dir: number;
}

/**
 * 기존 카드형 결과 데이터가 따로 필요할 경우
 */
export interface MindTuningResult {
  title: string;
  message: string;
  actionTip: string;
}
