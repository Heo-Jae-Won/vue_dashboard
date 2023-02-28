<template>
  <div v-if="boardInfo">
    <VContainer>
      <VForm>
        <VRow>
          <VCol cols="12" md="4"> 제목: <VTextField v-model="boardInfo.boardTitle" /> </VCol>
          <VCol cols="12" md="4">
            내용:
            <VTextField v-model="boardInfo.boardContent" class="h-50" />
          </VCol>
          <VCol cols="12" md="4">
            날짜:
            <VTextField v-model="boardInfo.boardRegisterDate" class="h-50" />
          </VCol>

          <VCol cols="12" md="4">
            조회수:
            <VTextField v-model="boardInfo.boardView" class="h-50" />
          </VCol>
          <VCol cols="12" md="4">
            작성자:
            <VTextField v-model="boardInfo.boardWriter" class="h-50" />
          </VCol>
          <VCol cols="12" md="4"> 이미지:<VFileInput @change="onFileChange($event)" :multiple="false" class="h-50" /> </VCol>
          <img :src="'http://localhost:8080/upload/'+boardInfo.boardPhoto" id="imagePreview" />
          <VSheet width="300" class="mx-auto">
            <VBtn type="button" block class="mt-2" @click="onUpdateSubmit">수정하기</VBtn>
          </VSheet>
          <VSheet width="300" class="mx-auto">
            <VBtn type="button" block class="mt-2" @click="onDeleteSubmit">삭제하기</VBtn>
          </VSheet>
        </VRow>
      </VForm>
    </VContainer>
  </div>
</template>

<script lang="ts">
import { getBoardInfo, onUpdateBoardInfo, onDeleteBoardInfo } from "@/utils/api.axios";
import { board } from "@/utils/instance.axios";
import axios from "axios";
import { defineComponent, onBeforeMount, ref } from "vue";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";
export default defineComponent({
  name: "boardRead",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const boardNo: string | string[] = route.params.boardNo;
    const boardInfo = ref();
    const fileData = ref();
    const fetchBoardInfo = async () => {
      await getBoardInfo(boardNo)
        .then((res) => {
          boardInfo.value = res.data as board;
        })
        .catch((e) => {
          console.log(e);
        });
    };

    // const getImage= async (photoName: string)  : string  => {
    //   const API_URL = `http://localhost:8080/upload/${photoName}`;
      
    //   await axios
    //     .get(API_URL) // axios-> promise 반환
    //     .then((response) => {
    //       //promise 성공시
    //        imgUrl = response.data[0].url;
    //     });
    // };

    const onUpdateSubmit = async () => {
      if (!confirm("정말로 수정하시겠습니까?")) {
        return;
      }

      const formData = new FormData();
      formData.append("boardTitle", boardInfo.value.boardTitle);
      formData.append("boardContent", boardInfo.value.boardContent);
      formData.append("boardWriter", "hjw");
      formData.append("boardPhoto", boardInfo.value.boardPhoto);
      formData.append("file", fileData.value);

      await onUpdateBoardInfo(formData, boardNo)
        .then(() => {
          alert("수정이 완료되었습니다");
          router.push("/board/list");
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const onFileChange = ($event: Event) => {
      const target = $event.target as HTMLInputElement;
      if (target && target.files) {
        fileData.value = target.files[0];
      }
      (document.getElementById("imagePreview") as HTMLImageElement).src = URL.createObjectURL(fileData.value);
    };

    const onDeleteSubmit = async () => {
      if (!confirm("정말로 삭제하시겠습니까?")) {
        return;
      }

      await onDeleteBoardInfo(boardNo)
        .then(() => {
          alert("삭제가 완료되었습니다.");
          router.push("/board/list");
        })
        .catch((error) => {
          console.log(error);
        });
    };

    onBeforeMount(() => {
      fetchBoardInfo();
    });

    // onBeforeRouteLeave((to, from) => {
    //   const answer = window.confirm("Do you really want to leave? you have unsaved changes!");
    //   // cancel the navigation and stay on the same page
    //   if (!answer) return false;
    // });
    return {
      boardInfo,
      onUpdateSubmit,
      onFileChange,
      onDeleteSubmit,
      fetchBoardInfo,
    };
  },
});
</script>
