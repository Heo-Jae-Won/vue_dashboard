<template>
  아이디: <v-text-field :rules="[(v) => rules.max20(v)]" v-model="userId" @change="PreventUnIntenedSubmit"/> <v-btn @click="checkDupliactedId">아이디 중복확인</v-btn><br />
  비밀번호: <v-text-field v-model="userPassword" type="password" /> 이름: <v-text-field v-model="userName" /> 이메일:
  <v-text-field :rules="[(v) => rules.email(v)]" v-model="userEmail" type="email" />
  생년월일: <v-text-field :rules="[(v) => rules.birth(v)]" v-model="userBirth" /> 성별:<v-radio-group :rules="[(v) => rules.required(v)]" v-model="userGender">
    <v-radio label="남성" value="M"></v-radio>
    <v-radio label="여성" value="F"></v-radio>
  </v-radio-group>
  주소: <v-text-field v-model="userAddress" />
  <v-btn @click="onInsertSubmit()">등록하기</v-btn>
</template>

<script lang="ts">
import { onCheckDuplicateId, onRegisterUserInfo } from "@/utils/api.axios";
import { rules } from "@/utils/rule";
import { defineComponent, reactive, ref, Ref, toRefs } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "userRegister",
  setup() {
    const form = reactive({
      userId: "" as string,
      userPassword: "" as string,
      userName: "" as string,
      userEmail: "" as string,
      userBirth: "" as string,
      userGender: "" as string,
      userAddress: "" as string,
    });

    const router = useRouter();
    const registerStatus: Ref<number> = ref(0);

    let checked = false;

    const PreventUnIntenedSubmit = () => {
      checked = false;
    };

    const checkDupliactedId = async () => {
      registerStatus.value = (await onCheckDuplicateId(form.userId)).data;
      if (registerStatus.value === 1) {
        alert("아이디가 중복되었습니다.");
        return;
      } else {
        alert("사용 가능한 아이디입니다.");
        checked = true;
      }
    };

    const onInsertSubmit = async () => {
      if (form.userGender === "") {
        alert("성별을 선택하세요");
        return;
      }

      if (checked === false) {
        alert("아이디 중복여부를 확인해주세요.");
        return;
      }

      if (!confirm("등록하시겠습니까?")) {
        return;
      }

      const formData = new FormData();
      formData.append("userId", form.userId);
      formData.append("userPassword", form.userPassword);
      formData.append("userName", form.userName);
      formData.append("userEmail", form.userEmail);
      formData.append("userBirth", form.userBirth);
      formData.append("userGender", form.userGender);
      formData.append("userAddress", form.userAddress);

      await onRegisterUserInfo(formData)
        .then(() => {
          alert("회원가입이 완료되었습니다.");
          router.push("/login");
        })
        .catch((error) => alert(error));
    };

    return {
      ...toRefs(form),
      onInsertSubmit,
      rules,
      registerStatus,
      checkDupliactedId,
      checked,
      PreventUnIntenedSubmit
    };
  },
});
</script>
