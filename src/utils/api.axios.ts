import { User } from "@/store/model/user.model";
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

export const getBoardInfo = (boardNo: string) => {
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

export const onDeleteBoardInfo = (boardNo: string) => {
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

export const onLogout = () => {
  return instance({
    url: `/logout`,
    method: "post",
  });
};

export const onUpdateUserInfo = (userId: string, data: User) => {
  return instance({
    url: `/users/${userId}`,
    method: "put",
    data,
  });
};

export const getUserInfo = (userId: string) => {
  return instance({
    url: `/users/${userId}`,
    method: "get",
  });
};

export const onUpdatePassword = (userId: string, userPassword: string) => {
  return instance({
    url: `/users/${userId}/password`,
    method: "put",
    data: {
      userPassword,
      userId,
    }
  });
};

export const onCheckDuplicateId=(userId : string)=>{
  return instance({
    url:`/users/data/${userId}`,
    method:'post',
  })
}

export const renderImage=(fileName : string)=>{
  return instance({
    url:`/display`,
    method:"get",
    params:{
      fileName:fileName
    }
  })
}
