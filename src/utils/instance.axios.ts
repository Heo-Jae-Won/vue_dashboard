import axios from "axios";
const apiRootPath = process.env.VUE_APP_TEST;

export const instance = axios.create({
  timeout: 10 * 1000,
  baseURL: apiRootPath,
});

//interface 만들고 class를 
export class board {}
export interface board {
  boardNo: number;
  boardTitle: string;
  boardContent: string;
  boardWriter: string;
  boardView: number;
  boardRegisterDate: Date;
  boardPhoto: string;
}
