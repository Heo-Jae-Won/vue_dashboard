<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "boardList",
});
</script>

<script setup lang="ts">
import { ref, defineEmits, defineProps } from "vue";

class board {
  constructor(
    public boardNo: number,
    public boardTitle: string,
    public boardContent: string,
    public boardWriter: string,
    public boardView: number,
    public boardRegisterDate: Date,
    public boardPhoto: string
  ) {
    this.boardNo = boardNo;
    this.boardTitle = boardTitle;
    this.boardContent = boardContent;
    this.boardWriter = boardWriter;
    this.boardView = boardView;
    this.boardRegisterDate = boardRegisterDate;
    this.boardPhoto = boardPhoto;
  }
}

const page = ref(1);
const props = defineProps<{ boards: Array<board>; last: number }>();
const emit = defineEmits<{
  (e: "nextPage"): void;
  (e: "prevPage"): void;
  (e: "onChangeSearchType"): void;
  (e: "onChangeKeyword"): void;
}>();
emit("prevPage");
emit("nextPage");
emit("onChangeSearchType");
emit("onChangeKeyword");

const nextPage = () => {
  page.value += 1;
};
const prevPage = () => {
  page.value -= 1;
};
</script>

<template>
  <div>
    <v-select block class="w-25" @update:menu="$emit('onChangeSearchType')" label="검색타입" :items="['제목', '내용', '작성자', '제목과 내용']" />
    <v-table theme="dark">
      <tr>
        <th>번호</th>
        <th>제목</th>
        <th>내용</th>
        <th>작성자</th>
        <th>조회수</th>
        <th>날짜</th>
        <th>이미지</th>
      </tr>
      <tr v-for="board in boards" :key="board.boardNo">
        <td>{{ board.boardNo }}</td>
        <td>{{ board.boardTitle }}</td>
        <td>{{ board.boardContent }}</td>
        <td>{{ board.boardWriter }}</td>
        <td>{{ board.boardView }}</td>
        <td>{{ board.boardRegisterDate }}</td>
        <img :src="`${board.boardPhoto || 'https://dummyimage.com/100x100'}`" alt="빈 이미지" />
      </tr>
    </v-table>
    <div class="btn-cover">
      <button :disabled="page <= 1" @click="$emit('prevPage'), prevPage()" class="page-btn">이전</button>
      <span class="page-count">{{ page }} / {{ last }} 페이지</span>
      <button :disabled="page >= props.last" @click="$emit('nextPage'), nextPage()" class="page-btn">다음</button>
    </div>
  </div>
</template>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}

table th {
  font-size: 1.2rem;
}

table tr {
  height: 2rem;
  text-align: center;
  border-bottom: 1px solid #505050;
}

table tr:first-of-type {
  border-top: 2px solid #404040;
}

table tr td {
  padding: 1rem 0;
  font-size: 1.1rem;
}

.btn-cover {
  margin-top: 1.5rem;
  text-align: center;
}

.btn-cover .page-btn {
  width: 5rem;
  height: 2rem;
  letter-spacing: 0.5px;
}

.btn-cover .page-count {
  padding: 0 1rem;
}
</style>
