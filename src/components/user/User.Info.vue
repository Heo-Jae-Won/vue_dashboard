<template>
  <div v-if="userInfo">
    아이디: <v-text-field v-model="userInfo.userId" readonly/>  이름: <v-text-field v-model="userInfo.userName" /> 이메일:
    <v-text-field v-model="userInfo.userEmail" type="email" /> 생년월일: <v-text-field v-model="userInfo.userBirth" /> 성별:
    <v-radio-group v-model="userInfo.userGender">
      <v-radio label="남성" value="M"></v-radio>
      <v-radio label="여성" value="F"></v-radio>
    </v-radio-group>
    주소: <v-text-field v-model="userInfo.userAddress" />
    <v-btn @click="$router.push(`/user/password`)">비밀번호 변경하기</v-btn>
    <v-btn @click="onUpdateSubmit()">수정하기</v-btn>
  </div>
</template>
<script lang="ts">
import { User } from "@/store/model/user.model";
import { getUserInfo, onUpdateUserInfo } from "@/utils/api.axios";
import { defineComponent, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "userInfo",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const userInfo = ref({} as User);

    const userId: string = route.params.userId as string;

    const onUpdateSubmit = () => {

      if (!confirm("정말로 수정하시겠습니까?")) {
        return;
      }

      onUpdateUserInfo(userInfo.value.userId, userInfo.value)
        .then(() => {
          alert("수정이 완료되었습니다.");
          router.push(`/`);
        })
        .catch((error) => alert(error));
    };

    onMounted(() => {
      getUserInfo(userId)
        .then((res) => {
          userInfo.value = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    });
    return {
      userInfo,
      onUpdateSubmit,
    };
  },
});
</script>
