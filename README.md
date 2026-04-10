## OopsLog

일상에서 겪은 실수나 실패 상황을 기록하면,
그 상황에 대한 해석 속 인지 왜곡을 분석하고
보다 균형 잡힌 관점으로 재구성할 수 있도록 돕는 인터랙티브 웹 서비스입니다.

⸻

### Goal

사용자가 자신의 실수나 실패를 단순히 반성하는 것이 아니라,
그 상황을 해석하는 사고 과정을 이해하고
더 건강한 방향으로 재구성할 수 있도록 돕는 것을 목표로 합니다.

⸻

### Core Concept

    •	사건 (실수/실패)
    •	해석 (내가 한 생각)
    •	왜곡 (인지 오류)
    •	재구성 (다른 관점)

이 흐름을 직접 경험하게 만드는 UI를 지향합니다.

⸻

### Tech Stack

    •	React (Vite)
    •	TypeScript
    •	Tailwind CSS
    •	Framer Motion

⸻

### Project Structure

src/
app/
pages/
components/
services/
hooks/
types/

⸻

### Planned Features

    •	실수/실패 상황 입력
    •	자동 해석 및 인지 왜곡 분석
    •	사실 vs 해석 비교 UI
    •	관점 전환 (Flip 인터랙션)

⸻

### Interaction Concept

단순히 결과를 보여주는 것이 아니라,
사용자가 직접 행동을 통해 사고를 재구성하도록 설계합니다.

⸻

### Development Flow

    •	main: 배포 기준
    •	dev: 개발 통합
    •	feat / chore: 작업 단위 브랜치

## 📁 Folder Structure
- `src/features/`: 기능 단위별 독립적인 코드 관리 (관심사 분리)
    - `mind-tuning/`: 마음 튜닝(AI 레스큐) 관련 로직
        - `api/`: API 통신 함수
        - `screens/`: 페이지 단위 컴포넌트
        - `constants/`: 앱 내 고정값
