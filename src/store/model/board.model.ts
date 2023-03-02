/*export class board {
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
}*/ //아래와 같이 쓰면 위의 constructor가 자동 생성!

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