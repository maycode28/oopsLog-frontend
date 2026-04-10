/** 전화번호 하이픈 포맷 */
export const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
};

/** 날짜 포맷: yyyy-MM-dd */
export const formatDate = (date: Date) =>
  date.toISOString().slice(0, 10);

/** 상대 시간 표시 (예: 3분 전) */
export const timeAgo = (dateStr: string) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const min = Math.floor(diff / 60_000);
  if (min < 1) return '방금 전';
  if (min < 60) return `${min}분 전`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}시간 전`;
  const day = Math.floor(hr / 24);
  return `${day}일 전`;
};