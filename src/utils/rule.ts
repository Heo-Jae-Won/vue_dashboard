type rulesType = boolean | string;

export const rules = {
  required: (v: string): rulesType => !!v || "필수 항목입니다.",
  requiredCustom:
    (t: string) =>
    (v: string): rulesType =>
      !!v || t,
  min:
    (n: number) =>
    (v: string): rulesType =>
      (typeof v == "string" && v.length) >= n || "최소 " + n + "글자 이상 입력해주세요.",
  birth: (v: string): rulesType => (typeof v == "string" && v.length) == 6 || "생년월일을 6글자로 입력해주세요.",
  min8: (v: string): rulesType => (typeof v == "string" && v.length) >= 8 || "최소 8글자 이상 입력해주세요.",
  min10: (v: string): rulesType => (typeof v == "string" && v.length) >= 10 || "최소 10글자 이상 입력해주세요.",
  max20: (v: string): rulesType => (typeof v == "string" && v.length) <= 20 || "최대 20글자까지 입력가능합니다.",
  max30: (v: string): rulesType => (typeof v == "string" && v.length) <= 30 || "최대 30글자까지 입력가능합니다.",
  max40: (v: string): rulesType => (typeof v == "string" && v.length) <= 40 || "최대 40글자까지 입력가능합니다.",
  max50: (v: string): rulesType => (typeof v == "string" && v.length) <= 50 || "최대 50글자까지 입력가능합니다.",
  max60: (v: string): rulesType => (typeof v == "string" && v.length) <= 60 || "최대 60글자까지 입력가능합니다.",
  max300: (v: string): rulesType => (typeof v == "string" && v.length) <= 300 || "최대 300글자까지 입력가능합니다.",
  krEn: (v: string): rulesType => /^[a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ\s/(/)]+$/i.test(v) || "숫자, 특수문자는 사용할 수 없습니다.",
  krEnNum: (v: string): rulesType => /^[0-9a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ\s/(/)]+$/i.test(v) || "한글, 영문, 숫자만 입력가능합니다.",
  email: (v: string): rulesType => /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(v) || "이메일 형식으로 입력해주세요.",
  allowComma: (v: string): rulesType => /[0-9.]$/i.test(v) || "숫자와 .만 입력가능합니다.",
  enNum: (v: string): rulesType => /^[0-9a-z]+$/.test(v) || "영소문자, 숫자만 입력가능합니다.",
  passwordCheck: (v: string): rulesType => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/.test(v) || "8자리 이상의 영대소문자와 숫자, 특수문자를 포함해야 합니다.",
};
