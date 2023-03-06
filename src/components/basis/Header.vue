<template>
  <v-row>
    <v-col v-for="(bar, i) in bars" :key="i" cols="8" sm="12" md="12" class="my-4">
      <v-toolbar :color="bar.class" :dark="bar.dark">
        <v-toolbar-title @click="$router.push(`/`)">Home</v-toolbar-title>
        <v-toolbar-title @click="$router.push(`/board/list`)">상품목록</v-toolbar-title>
        <v-toolbar-title @click="$router.push(`/board/insert`)">상품등록</v-toolbar-title>
        <v-toolbar-title v-if="loginUser !== ''" @click="$router.push(`/user/${loginUser}`)">{{ loginUser }}</v-toolbar-title>
        <v-toolbar-title v-if="loginUser === ''" @click="$router.push(`/login`)">로그인</v-toolbar-title>
        <v-toolbar-title v-else @click="onLogoutSubmit">로그아웃</v-toolbar-title>
      </v-toolbar>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { useUserStore } from "@/store/loginuser";
import { onLogout } from "@/utils/api.axios";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { ref } from "vue";

export default defineComponent({
  name: "headerTop",
  setup() {
    const bars = ref([{ class: "primary", dark: true }]);
    const store = useUserStore();
    const { loginUser } = storeToRefs(store);
    const { changeLoginUser } = store;

    const onLogoutSubmit = async () => {
      onLogout();
      alert("로그아웃이 완료되었습니다.");
      changeLoginUser("");
    };
    return {
      bars,
      loginUser,
      onLogoutSubmit,
    };
  },
});
</script>
