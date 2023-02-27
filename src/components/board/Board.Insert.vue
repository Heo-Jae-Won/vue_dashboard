<template>
  <div ref="element">boardinsert</div>
  <v-container>
    <v-form validate-on="submit" @submit.prevent="onFormSubmit">
      <v-row>
        <v-col cols="12" md="4"> 제목: <v-text-field v-model="boardTitle" /> </v-col>
        <v-col cols="12" md="4">
          내용:
          <v-text-field v-model="boardContent" class="h-50" />
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
import { defineComponent, ref, computed, Ref, onMounted } from "vue";
import { onInsertBoardInfo } from "@/utils/api.axios";
export default defineComponent({
  name: "boardInsert",
  setup() {
    const boardTitle = ref("");
    const boardContent = ref("");
    const fileData = ref();
    const boardWriter = ref("hjw");

    const element: Ref<HTMLElement | null> = ref(null);
    onMounted(() => {
      console.log(element);
    });

    //computed는 변화를 감지하여 내부 함수가 발동됨.
    const fileUrl = computed(() => {

      //filedata.value가 없을 때 처리가 필요함. 따라서 없으면 ""를 return
      if (!fileData.value) {
        return "";
      }
      return window.URL.createObjectURL(fileData.value);
    });
    const onFileChange = ($event: Event) => {
      const target = $event.target as HTMLInputElement;
      if (target && target.files) {
        fileData.value = target.files[0];
      }
      // 오른쪽 대신에 ref로 DOM에 접근. (document.getElementById("imagePreview") as HTMLImageElement).src = URL.createObjectURL(fileData.value);
    };

    const onFormSubmit = async () => {
      const formData = new FormData();
      formData.append("boardTitle", boardTitle.value);
      formData.append("boardContent", boardContent.value);
      formData.append("boardWriter", boardWriter.value);
      formData.append("file", fileData.value);
      onInsertBoardInfo(formData);
    };

    return {
      boardTitle,
      boardContent,
      fileData,
      boardWriter,
      fileUrl,
      element,
      onFormSubmit,
      onFileChange,
    };
  },
});
</script>
