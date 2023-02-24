<template>
  <div>boardinsert</div>
  <v-container>
    <v-form validate-on="submit" @submit.prevent="onFormSubmit">
      <v-row>
        <v-col cols="12" md="4"> 제목: <v-text-field v-model="boardTitle" /> </v-col>
        <v-col cols="12" md="4">
          내용:
          <v-text-field v-model="boardContent" class="h-50" />
        </v-col>
        <v-col cols="12" md="4"> 이미지:<v-file-input @change="onFileChange($event)" :multiple="false" class="h-50"/> </v-col>
        <img src="https://dummyimage.com/100x100" />
        <v-sheet width="300" class="mx-auto"> <v-btn type="button" block class="mt-2" @click="onFormSubmit">submit</v-btn></v-sheet>
      </v-row>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { boardInsert } from "@/utils/api.axios";
export default defineComponent({
  name: "boardInsert",
  setup() {

    const boardTitle = ref("");
    const boardContent = ref("");
    const fileData = ref();
    const boardWriter = ref("hjw");

    const onFileChange =($event : Event )=>{
      const target = $event.target as HTMLInputElement;
            if (target && target.files) {
              fileData.value = target.files[0];
            }
    }


    const onFormSubmit = async () => {
      const formData = new FormData();
      formData.append("boardTitle", boardTitle.value);
      formData.append("boardContent", boardContent.value);
      formData.append("boardWriter", boardWriter.value);
      formData.append("file", fileData.value);
      boardInsert(formData);

    };
    return {
      boardTitle,
      boardContent,
      fileData,
      boardWriter,
      onFormSubmit,
      onFileChange
    };
  },
});
</script>
