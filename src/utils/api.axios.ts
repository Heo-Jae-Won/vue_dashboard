import { instance } from "./instance.axios";

export const InsertBoardInfo = (formData: FormData) => {
  return instance({
    url: "/boards",
    method: "post",
    data: formData,
    headers: {
      "content-type": "multipart/form-data",
    },
  });
};

export const getBoardList = (pageNum: number, searchType?: string, keyword?: string) => {
  return instance({
    url: "/boards",
    method: "get",
    params: {
      page: pageNum,
      searchType: searchType,
      keyword: keyword,
    },
  });
};
