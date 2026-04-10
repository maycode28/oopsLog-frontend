/** 이메일 형식 검사 */
export const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

/** 한국 휴대폰 번호 형식 검사 */
export const isValidPhone = (value: string) =>
  /^01[016789]-?\d{3,4}-?\d{4}$/.test(value);

/** 비밀번호: 8자 이상, 영문+숫자 포함 */
export const isValidPassword = (value: string) =>
  value.length >= 8 && /[a-zA-Z]/.test(value) && /\d/.test(value);

/** 아이디: 영문 소문자/숫자, 4~20자 */
export const isValidLoginId = (value: string) =>
  /^[a-z0-9]{4,20}$/.test(value);