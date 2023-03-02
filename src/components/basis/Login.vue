<template>
  <div>
    아이디: <VTextField v-model="userId" /> 비밀번호: <VTextField v-model="userPassword" type="password" />
    <VBtn @click="onLoginSubmit">로그인</VBtn>
    <VBtn @click="$router.back()">뒤로가기</VBtn>
    <VBtn @click="$router.push(`/register`)">회원가입</VBtn>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { useUserStore } from "@/store/loginuser";
import { onLogin } from "@/utils/api.axios";
import { storeToRefs } from "pinia";
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  name: "login",
  setup() {
    const userId = ref("");
    const userPassword = ref("");
    const userStatus = ref();
    const store = useUserStore();
    const router=useRouter();
    const { changeLoginUser,loginUser } = store;

    const onLoginSubmit = async () => {
      const formData = new FormData();
      formData.append("userId", userId.value);
      formData.append("userPassword", userPassword.value);

      //routerguard 넣기

      try {
        userStatus.value = (await onLogin(formData)).data;
        if (userStatus.value === 1) {
          alert("로그인에 성공하였습니다.");
          changeLoginUser(userId.value);
          router.push(`/`)
        } else {
          alert("비밀번호나 아이디가 올바르지 않습니다.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    return {
      onLogin,
      userStatus,
      userId,
      userPassword,
      onLoginSubmit,
    };
  },
});
</script>
