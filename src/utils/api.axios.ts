import { AxiosPromise } from "axios";
import { instance } from "./instance.axios";

export const onInsertBoardInfo = (formData: FormData) => {
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

export const getBoardInfo = (boardNo: string | string[]) => {
  return instance({
    url: `/boards/${boardNo}`,
    method: "get",
  });
};

export const onUpdateBoardInfo = (formData: FormData, boardNo: string | string[]) => {
  return instance({
    url: `/boards/${boardNo}/update`,
    method: "post",
    data: formData,
    headers: {
      "content-type": "multipart/form-data",
    },
  });
};

export const onDeleteBoardInfo = (boardNo: string | string[]) => {
  return instance({
    url: `/boards/${boardNo}`,
    method: "delete",
  });
};

export const onRegisterUserInfo = (formData: FormData) => {
  return instance({
    url: `/users`,
    method: "post",
    data: formData,
  });
};

export const onLogin = (formData: FormData): AxiosPromise<number> => {
  return instance({
    url: `/login`,
    method: "post",
    data: formData,
  });
};
