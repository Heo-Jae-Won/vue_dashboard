<template>
  <div v-if="boardInfo">
    <v-container>
      <v-form validate-on="submit" @submit.prevent="onFormSubmit">
        <v-row>
          <v-col cols="12" md="4"> 제목: <v-text-field v-model="boardInfo.boardTitle" /> </v-col>
          <v-col cols="12" md="4">
            내용:
            <v-text-field v-model="boardInfo.boardContent" class="h-50" />
          </v-col>
          <v-col cols="12" md="4">
            날짜:
            <v-text-field v-model="boardInfo.boardRegisterDate" class="h-50" />
          </v-col>

          <v-col cols="12" md="4">
            조회수:
            <v-text-field v-model="boardInfo.boardView" class="h-50" />
          </v-col>
          <v-col cols="12" md="4">
            작성자:
            <v-text-field v-model="boardInfo.boardWriter" class="h-50" />
          </v-col>
          <v-col cols="12" md="4"> 이미지:<v-file-input @change="onFileChange($event)" :multiple="false" class="h-50" /> </v-col>
          <img :src="boardInfo.boardPhoto" id="imagePreview" />
          <v-sheet width="300" class="mx-auto">
            <v-btn type="button" block class="mt-2" @click="onFormSubmit">수정하기</v-btn>
          </v-sheet>
          <v-sheet width="300" class="mx-auto">
            <v-btn type="button" block class="mt-2" @click="onDeleteSubmit">삭제하기</v-btn>
          </v-sheet>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<script lang="ts">
import { getBoardInfo, onUpdateBoardInfo, onDeleteBoardInfo } from "@/utils/api.axios";
import { board } from "@/utils/instance.axios";
import { defineComponent, onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "boardRead",
  setup() {
    const route = useRoute();
    const boardNo: string | string[] = route.params.boardNo;
    const boardInfo = ref();

    const fileData = ref();
    const fetchBoardInfo = () => {
      getBoardInfo(boardNo)
        .then((res) => {
          boardInfo.value = res.data as board;
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const onFormSubmit = async () => {
      const formData = new FormData();
      formData.append("boardTitle", boardInfo.value.boardTitle);
      formData.append("boardContent", boardInfo.value.boardContent);
      formData.append("boardWriter", "hjw");
      formData.append("boardPhoto", boardInfo.value.boardPhoto);
      formData.append("file", fileData.value);

      onUpdateBoardInfo(formData, boardNo);
    };

    const onFileChange = ($event: Event) => {
      const target = $event.target as HTMLInputElement;
      if (target && target.files) {
        fileData.value = target.files[0];
      }
      (document.getElementById("imagePreview") as HTMLImageElement).src = URL.createObjectURL(fileData.value);
    };

    const onDeleteSubmit = () => {
      onDeleteBoardInfo(boardNo);
    };

    onBeforeMount(() => {
      fetchBoardInfo();
    });
    return {
      boardInfo,
      onFormSubmit,
      onFileChange,
      onDeleteSubmit,
      fetchBoardInfo,
    };
  },
});
</script>
