<template>
  <div>
    <h1>TABLE PAGINATION</h1>
    <boardList :boards="pageArray" :last="last" @nextPage="nextPage" @prevPage="prevPage" />
  </div>
</template>

<script setup lang="ts">
import { fetchBoardList } from "@/utils/api.axios";
import { onMounted, ref, watchEffect } from "vue";
import boardList from "../components/board/BoardList.vue";

const pageArray = ref([]);
const pageNum = ref(1);
const last = ref(1);

const nextPage = () => {
  pageNum.value += 1;
};
const prevPage = () => {
  pageNum.value -= 1;
};

onMounted(() => {
  watchEffect(() => {
    fetchBoardList(pageNum.value, pageArray, last);
  });
});
</script>
