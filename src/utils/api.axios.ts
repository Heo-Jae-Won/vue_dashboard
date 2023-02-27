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

export const getBoardInfo = (boardNo : string | string[])=>{
  return instance({
    url:`/boards/${boardNo}`,
    method:"get",
  })
}

export const onUpdateBoardInfo = (formData : FormData, boardNo: string | string[] )=>{
  return instance({
    url:`/boards/${boardNo}/update`,
    method:'post',
    data:formData,
    headers: {
      "content-type": "multipart/form-data",
    },
  })
}

export const onDeleteBoardInfo =  (boardNo: string | string[])=>{
  return instance({
    url:`/boards/${boardNo}`,
    method:'delete',
  })
}
