<template>
  <div>
    <v-select v-model="searchType" block class="w-25" label="검색타입" :items="['제목', '내용', '작성자', '제목과 내용']" />
    <v-text-field v-model="keyword" @keyup.enter="fetchFilterdBoardList()" />
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
      <tr v-for="board in pageArray" :key="board.boardNo">
        <td @click="$router.push(`/board/read/${board.boardNo}`)">{{ board.boardNo }}</td>
        <td>{{ board.boardTitle }}</td>
        <td>{{ board.boardContent }}</td>
        <td>{{ board.boardWriter }}</td>
        <td>{{ board.boardView }}</td>
        <td>{{ board.boardRegisterDate }}</td>
        <img :src="`${board.boardPhoto || 'https://dummyimage.com/100x100'}`" alt="빈 이미지" />
      </tr>
    </v-table>
    <div class="btn-cover">
      <button :disabled="page <= 1" @click="prevPage()" class="page-btn">이전</button>
      <span class="page-count">{{ page }} / {{ last }} 페이지</span>
      <button :disabled="page >= last" @click="nextPage()" class="page-btn">다음</button>
    </div>
  </div>
</template>

<script lang="ts">
import { getBoardList } from "@/utils/api.axios";
import { board } from "@/utils/instance.axios";
import { defineComponent, onBeforeMount, ref } from "vue";
export default defineComponent({
  name: "boardList",
  setup() {
    const pageArray = ref([] as Array<board>);
    const page = ref(1);
    const last = ref(1);
    const searchType = ref("");
    const keyword = ref("");

    const fetchBoardList = () => {
      getBoardList(page.value, searchType.value, keyword.value).then((res) => {
        pageArray.value = res.data.list;
        last.value = res.data.last;
      });
    };

    const nextPage = () => {
      page.value += 1;
      fetchBoardList();
    };

    const prevPage = () => {
      page.value -= 1;
      fetchBoardList();
    };

    const fetchFilterdBoardList = () => {
      page.value = 1;
      fetchBoardList();
    };

    onBeforeMount(() => {
      getBoardList(1).then((res) => {
        pageArray.value = res.data.list;
        last.value = res.data.last;
      });
    });
    return {
      pageArray,
      page,
      last,
      searchType,
      keyword,
      fetchBoardList,
      nextPage,
      prevPage,
      fetchFilterdBoardList,
    };
  },
});
</script>
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
