import { Component } from '@angular/core';

@Component({
  templateUrl: './level2.component.html',
  styleUrls: ['./level2.component.css'],
})
export class Level2Component {

  public currentPlayerIndex = 1;
  private currentWinnerIndex=0;

  constructor() {
    this.restart();
  }

  public getPlayerName(col: number, row: number): number {
    return this.boardContent[row][col];
  }
  public getStyle(col: number, row: number):string{

    if(this.boardContent[row][col] !== 0){
      return `occupied-${this.getPlayerName(col, row)}`;
    }

    return '';
  }



  public drop(colIx: number) {
    console.log(`Coin dropped in column ${colIx}`);
    if(this.currentWinnerIndex===0)
    {
      this.coinSet(colIx);
      this.currentWinnerIndex=this.getWinnerIndex();
      this.currentPlayerIndex = this.currentPlayerIndex === 1 ? 2 : 1;
    }

  }
  private coinSet(colIx: number){
    for (let row = 3; row >=0; row--){
      if(this.boardContent[row][colIx]===0){
        this.boardContent[row][colIx]= this.currentPlayerIndex;
        break;
      }
    }
  }




  public boardContent!: number[][];

  public get winnerIndex(): number {
    return this.currentWinnerIndex;
  }



  public restart(): void {
    this.boardContent = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    this.currentPlayerIndex = 1;
    this.currentWinnerIndex = 0;
  }
  private getWinnerIndex(): number {

    //Rows

    for (let row = 0; row < 4; row++) {
      const first = this.boardContent[row][0];
      if (
        first !== 0 &&
        this.boardContent[row][1] === first &&
        this.boardContent[row][2] === first &&
        this.boardContent[row][3] === first
      ) {
        return first;
      }
    }


    //Cols


    for (let col = 0; col < 4; col++) {
      const first = this.boardContent[0][col];
      if (
        first !== 0 &&
        this.boardContent[1][col] === first &&
        this.boardContent[2][col] === first &&
        this.boardContent[3][col] === first
      ) {
        return first;
      }
    }

    //Diagonals

     const first = this.boardContent[0][0];
     const second = this.boardContent[0][3];

      if (
        this.boardContent[1][1] === first &&
        this.boardContent[2][2] === first &&
        this.boardContent[3][3] === first
      ) {
        return first;
      }

      if (
        this.boardContent[1][2] === second &&
        this.boardContent[2][1] === second &&
        this.boardContent[3][0] === second
      ) {
        return second;
      }


    return 0;
  }


}
