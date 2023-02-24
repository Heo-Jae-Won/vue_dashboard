import { Ref } from "vue";
import { instance } from "./instance.axios";

export const boardInsert = (formData: FormData) => {
  instance.post("/boards", formData, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
};


export const fetchBoardList = (pageNum: number, pageList: Ref<never[]>, last: Ref<number>) => {
  instance
    .get(`/boards?page=${pageNum}&searchType=제목&keyword=`)
    .then((res) => {
      pageList.value = res.data.list;
      last.value = res.data.last;
    })
    .catch((err) => {
      console.log(err);
    });
};

const fetchData = (pageNum: number) => {};
