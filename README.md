# oopsLog

### 실패를 기록하는 순간, 생각이 바뀌는 경험

---

## 📌 Overview

oopsLog는 사용자의 실패 경험을 AI를 통해 분석하여  
**인지 왜곡을 구조적으로 교정하는 서비스**입니다.

단순한 감정 기록이 아니라,  
👉 **사고 방식 자체를 재구성하는 시스템**입니다.

---

## 🎯 Problem

현대 사용자들은 실패를 다음과 같이 해석합니다:

- 하나의 실수를 전체 능력으로 일반화
- 타인의 반응을 부정적으로 해석
- 미래를 부정적으로 단정
- 완벽하지 않으면 시작을 회피

👉 문제는 “실패”가 아니라  
👉 **실패를 해석하는 방식(인지 구조)** 입니다.

---

## 💡 Solution

oopsLog는 다음 3단계로 문제를 해결합니다:

1. 사실 추출 (Fact Extraction)
2. 인지 왜곡 탐지 (Distortion Detection)
3. 인지 재구성 (Reframing)

---

## 🏗️ System Architecture

Frontend (Vercel - React)
↓
Backend (Railway - Spring Boot)
↓
LLM Orchestrator (Gemini / OpenAI)
↓
Database (Railway MariaDB)

---

## ⚙️ Tech Stack

### Frontend

- React + TypeScript
- Vite
- Vercel (Deployment)

### Backend

- Spring Boot
- JPA / Hibernate
- Railway (Deployment)

### AI

- Gemini (Primary)
- OpenAI (Fallback)

### Database

- MariaDB (Railway)

---

## 🚀 Deployment

## 🌐 Frontend (Vercel)

```bash
cd frontend
npm install
npm run build
```

Vercel 설정:

- Framework: Vite
- Build Command: npm run build
- Output Directory: dist

환경 변수:

```
VITE_API_BASE_URL=https://oops-log-frontend.vercel.app/login
```

---

## 🚂 Backend (Railway)

빌드:

```bash
./gradlew build
```

Railway 설정:

- Start Command:

```bash
java -jar build/libs/*.jar
```

환경 변수:

```
GEMINI_API_KEY=...
OPENAI_API_KEY=...

SPRING_DATASOURCE_URL=...
SPRING_DATASOURCE_USERNAME=...
SPRING_DATASOURCE_PASSWORD=...

LLM_PRIMARY=gemini
LLM_FALLBACK=openai
```

---

## 🔐 Authentication

- Session 기반 인증 (JSESSIONID)
- Vercel → Railway 요청 시 반드시:

```js
credentials: "include";
```

---

## 📡 API

### 분석 API

POST /api/analyses/{userId}/analyze

### 사용자 API

POST /api/users/signup  
POST /api/users/login

---

## 🧠 AI Strategy

- Prompt Engineering 기반 구조
- JSON strict output
- Gemini → OpenAI fallback
- Rate limiting 적용

---

## 💥 Differentiation

- 감정 중심 ❌ → 인지 구조 중심 ⭕
- 텍스트 출력 ❌ → 구조화된 데이터 ⭕
- 위로 ❌ → 사고 재구성 ⭕

---

## 📈 Impact

- 자기 인식 향상
- 감정 해석 오류 감소
- 회복 탄력성 증가

---

## 📌 Roadmap

- JWT 인증 전환
- 개인화 AI
- 데이터 시각화

---

## 👨‍💻 Contributors

- maycode28
- leeseonju12

---

## 🧾 Conclusion

oopsLog는  
👉 실패를 기록하는 서비스가 아니라  
👉 **생각을 다시 보게 만드는 시스템입니다**
