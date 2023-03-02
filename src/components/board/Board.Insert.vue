<template>
  <div ref="element">boardinsert</div>
  <v-container>
    <v-form validate-on="submit" @submit.prevent="onFormSubmit">
      <v-row>
        <v-col cols="12" md="4"> 제목: <v-text-field :rules="[v=>rules.max50(v)]" v-model="boardTitle" /> </v-col>
        <v-col cols="12" md="4">
          내용:
          <v-text-field :rules="[v=>rules.max300(v)]" v-model="boardContent" class="h-50" />
        </v-col>
        <v-col cols="12" md="4"> 이미지:<v-file-input @change="onFileChange($event)" :multiple="false" class="h-50" /> </v-col>
        <img :src="fileUrl" />
        <v-sheet width="300" class="mx-auto">
          <v-btn type="button" block class="mt-2" @click="onFormSubmit">submit</v-btn>
        </v-sheet>
      </v-row>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { useUserStore } from "@/store/loginuser";
import { onInsertBoardInfo } from "@/utils/api.axios";
import { storeToRefs } from "pinia";
import { computed, defineComponent, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { rules } from "@/utils/rule";
export default defineComponent({
  name: "boardInsert",
  setup() {
    const boardInfo = reactive({
      boardTitle: "" as string,
      boardContent: "" as string,
      boardWriter: "hjw" as string,
      fileData: "" as any,
    });
    const store=useUserStore();
    const {loginUser}=storeToRefs(store);
    const router = useRouter();
    const fileUrl = computed(() => {
      if (!boardInfo.fileData) {
        return "";
      }
      return window.URL.createObjectURL(boardInfo.fileData);
    });

    const onFileChange = ($event: Event) => {
      const target = $event.target as HTMLInputElement;
      if (target && target.files) {
        boardInfo.fileData = target.files[0];
      }
    };

    const onFormSubmit = async () => {

      if(loginUser.value===""){
        alert("로그인이 필요합니다.");
        router.push('/login');
        return;
      }

      if (!confirm("정말로 등록하시겠습니까?")) {
        return;
      }

      const formData = new FormData();
      formData.append("boardTitle", boardInfo.boardTitle);
      formData.append("boardContent", boardInfo.boardContent);
      formData.append("boardWriter", boardInfo.boardWriter);
      formData.append("file", boardInfo.fileData);

      await onInsertBoardInfo(formData)
        .then(() => {
          alert("등록이 완료되었습니다.");
          router.push({
            path: `/board/list`,
          });
        })
        .catch((error) => {
          alert(error);
        });
    };

    return {
      fileUrl,
      ...toRefs(boardInfo),
      onFormSubmit,
      onFileChange,
      rules
    };
  },
});
</script>
