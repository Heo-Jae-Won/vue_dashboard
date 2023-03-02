<template>
  아이디: <v-text-field :rules="[(v) => rules.max20(v)]" v-model="userId" /> 비밀번호: <v-text-field v-model="userPassword" type="password" /> 이름: <v-text-field v-model="userName" /> 이메일:
  <v-text-field :rules="[v=>rules.email(v)]" v-model="userEmail" type="email" />
  생년월일: <v-text-field :rules="[v=>rules.birth(v)]" v-model="userBirth" /> 성별:<v-radio-group :rules="[(v)=>rules.required(v)]" v-model="userGender">
    <v-radio label="남성" value="M"></v-radio>
    <v-radio label="여성" value="F"></v-radio>
  </v-radio-group>
  주소: <v-text-field v-model="userAddress" />
  <v-btn @click="onInsertSubmit()">등록하기</v-btn>
</template>

<script lang="ts">
import { onRegisterUserInfo } from "@/utils/api.axios";
import { defineComponent, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { rules } from "@/utils/rule";

export default defineComponent({
  name: "register",
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

    //상세주소 만들어보려고 reactive에 있는 userAddress를 잘게 쪼게서 userAddressBasic과 userAddressDetail로 나누고, ref 변수를
    //만들어 userAddress로 두 값을 더해보았으나 빈 값이 뜸. 따라서 원래의 방식으로 회귀.

    // 비구조화 할당하면 formData가 빈값으로 나옴. 아래같이 써야할 듯.
    //const {userId,userPassword,userName,userEmail,userBirth,userGender,userAddress}=form;

    const onInsertSubmit = () => {
      if (form.userGender === "") {
        alert("성별을 선택하세요");
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

      onRegisterUserInfo(formData)
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
    };
  },
});
</script>
