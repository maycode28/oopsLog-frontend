import { mapAnalyzeResponseToAIResult } from '../api/mapper';
import type { AnalyzeResponseDto } from '../api/types';

export const DUMMY_ANALYZE_RESPONSE: AnalyzeResponseDto = {
  ti: '인지 왜곡 교정 훈련',
  fc: [
    {
      l: '과잉 일반화',
      m: '나는 이번 시험을 망쳤으니 앞으로 어떤 일을 해도 절대 성공하지 못할 거야.',
      r: '이번 시험 결과가 아쉽긴 하지만, 이것이 내 미래의 모든 가능성을 결정짓는 것은 아니야.',
    },
    {
      l: '임의적 추론',
      m: '친구가 내 메시지를 읽고도 답장이 없는 걸 보니 나를 싫어하는 게 분명해.',
      r: '친구가 지금 바쁜 일이 있거나 나중에 답장하려고 생각 중일 수도 있어.',
    },
    {
      l: '흑백논리',
      m: '완벽하게 해내지 못할 바에는 아예 시작도 하지 않는 게 나아.',
      r: '처음부터 완벽할 수는 없어. 작은 부분이라도 실행에 옮기는 것이 아무것도 안 하는 것보다 가치 있어.',
    },
  ],
  fs: [
    '시험 점수가 기대보다 낮게 나옴',
    '메시지 전송 후 3시간 동안 답장이 오지 않음',
    '새로운 프로젝트 계획을 세우는 중임',
  ],
  am: '단편적인 상황으로 전체를 판단하기보다 객관적인 사실을 바탕으로 유연하게 생각하는 연습이 필요합니다.',
};

export const DUMMY_AI_RESULT = mapAnalyzeResponseToAIResult(DUMMY_ANALYZE_RESPONSE);
