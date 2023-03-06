<template>
  <div v-if="boardInfo">
    <VContainer>
      <VForm>
        <VRow>
          <VCol cols="12" md="4"> 제목: <VTextField :rules="[v=>rules.max50(v)]" v-model="boardInfo.boardTitle" /> </VCol>
          <VCol cols="12" md="4">
            내용:
            <VTextField :rules="[v=>rules.max300(v)]" v-model="boardInfo.boardContent" class="h-50" />
          </VCol>
          <VCol cols="12" md="4">
            날짜:
            <VTextField v-model="boardInfo.boardRegisterDate" class="h-50" readonly />
          </VCol>
          <VCol cols="12" md="4">
            조회수:
            <VTextField v-model="boardInfo.boardView" class="h-50" readonly />
          </VCol>
          <VCol cols="12" md="4">
            작성자:
            <VTextField v-model="boardInfo.boardWriter" class="h-50" readonly />
          </VCol>
          <VCol cols="12" md="4"> 이미지:<VFileInput @change="onFileChange($event)" :multiple="false" class="h-50" /> </VCol>
          <img :src="'http://dpms.openobject.net:4103/api/display?fileName=' + boardInfo.boardPhoto" id="imagePreview" />
          <VSheet width="300" class="mx-auto">
            <VBtn :disabled="!isWriterEquals" type="button" block class="mt-2" @click="onUpdateSubmit">수정하기</VBtn>
          </VSheet>
          <VSheet width="300" class="mx-auto">
            <VBtn :disabled="!isWriterEquals" type="button" block class="mt-2" @click="onDeleteSubmit">삭제하기</VBtn>
          </VSheet>
        </VRow>
      </VForm>
    </VContainer>
  </div>
</template>

<script lang="ts">
import { useUserStore } from "@/store/loginuser";
import { Board } from "@/store/model/board.model";
import { getBoardInfo, onDeleteBoardInfo, onUpdateBoardInfo } from "@/utils/api.axios";
import { storeToRefs } from "pinia";
import { computed, defineComponent, onBeforeMount, ref, Ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { rules } from "@/utils/rule";
export default defineComponent({
  name: "boardRead",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const boardNo: string = route.params.boardNo as string;
    const boardInfo :Ref<Board> = ref({} as Board);
    const fileData = ref();
    const store = useUserStore();
    const { loginUser } = storeToRefs(store);
    //boardInfo와 loginUser 모두 변화하기 때문에 computed를 사용한듯 싶다.
    const isWriterEquals = computed(() => boardInfo.value.boardWriter === loginUser.value);

    const fetchBoardInfo = async () => {
      await getBoardInfo(boardNo)
        .then((res) => {
          boardInfo.value = res.data as Board;
          console.log(isWriterEquals);
        })
        .catch((e) => {
          console.log(e);
        });
    };

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

    return {
      boardInfo,
      loginUser,
      onUpdateSubmit,
      onFileChange,
      onDeleteSubmit,
      fetchBoardInfo,
      isWriterEquals,
      rules
    };
  },
});
</script>
