<template>
  원하는 비밀번호: <v-text-field v-model="userPassword" type="password" @change="onAlertPasswordChange" /> 비밀번호 재입력:
  <v-text-field v-model="confirmPassword" type="password" />
  <v-btn type="button" block class="mt-2" @click="onUpdateSubmit">수정하기</v-btn>
  <v-btn type="button" block class="mt-2" @click="onConfirimPassword">비밀번호일치</v-btn>
</template>
<script lang="ts">
import { useUserStore } from "@/store/loginuser";
import { onUpdatePassword } from "@/utils/api.axios";
import { defineComponent, Ref, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "UserPassword",
  setup() {
    const userPassword: Ref<string> = ref("");
    const confirmPassword: Ref<string> = ref("");
    const store = useUserStore();
    const router = useRouter();
    let checked = false;
    const { loginUser } = store;

    const onConfirimPassword = () => {
      if (userPassword.value === confirmPassword.value) {
        checked = true;
        alert("비밀번호가 일치합니다.");
      } else {
        alert("비밀번호가 일치하지 않습니다.");
      }
    };

    const onAlertPasswordChange = () => {
      checked = false;
    };

    const onUpdateSubmit = () => {
      if (checked && userPassword.value === confirmPassword.value) {
        if (!confirm("정말로 수정하시겠습니까?")) {
          return;
        }
        onUpdatePassword(loginUser, userPassword.value);
        alert("수정이 완료되었습니다.");
        router.push("/");
      } else {
        alert("다시 일치여부를 검증해주세요");
      }
    };

    return {
      userPassword,
      confirmPassword,
      onUpdateSubmit,
      onConfirimPassword,
      checked,
      onAlertPasswordChange,
    };
  },
});
</script>
