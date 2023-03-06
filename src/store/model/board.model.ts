export class Board {}
export interface Board {
  boardNo: number;
  boardTitle: string;
  boardContent: string;
  boardWriter: string;
  boardView: number;
  boardRegisterDate: Date;
  boardPhoto: string;
}