<template>
  <div>
    아이디: <v-text-field /> 비밀번호: <v-text-field />
    <v-btn>로그인</v-btn>
    <v-btn @click="$router.back()">뒤로가기</v-btn>
    <v-btn @click="$router.push(`/register`)">회원가입</v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "login",
  setup() {
    const abc = "abc";
    return {
      abc,
    };
  },
});
</script>
