import { floor, random } from 'mathjs';

interface Square {
    row: number;
    column: number;
    state: "closed" | "opened" | "flagged";
    hasMine: boolean;
    nearMines: number;
}

let totalRow: number = 5;
let totalColumn: number = 5;
let qtdMinas: number = 5;

function criaSquare(row: number, col: number): Square {
    return {
        row: row,
        column: col,
        state: "closed",
        hasMine: false,
        nearMines: 0
    };
}

function criaMatrizCampo(rows: number, cols: number): Square[][] {
    let matrizCampo: Square[][] = [];
    for (let i = 0; i < rows; i++) {
        let row: Square[] = [];
        for (let j = 0; j < cols; j++) {
            let square = criaSquare(i, j);
            row.push(square);
        }
        matrizCampo.push(row);
    }
    return matrizCampo;
}

function sorteiaMinas(matrizCampo: Square[][], qtdMinas: number): void {
    let totalRow: number = matrizCampo.length;
    let totalColumn: number = matrizCampo[0].length;
    let minasSorteadas: number = 0;

    while (minasSorteadas < qtdMinas) {
        let row: number = floor(totalRow * random());
        let col: number = floor(totalColumn * random());

        if (!matrizCampo[row][col].hasMine) {
            matrizCampo[row][col].hasMine = true;
            minasSorteadas++;
        }
    }
}

function contaVizinhos(matrizCampo: Square[][]): void {
    let totalRow: number = matrizCampo.length;
    let totalColumn: number = matrizCampo[0].length;

    for (let i = 0; i < totalRow; i++) {
        for (let j = 0; j < totalColumn; j++) {
            if (!matrizCampo[i][j].hasMine) {
                let minasAoRedor: number = 0;

                for (let x = -1; x <= 1; x++) {
                    for (let y = -1; y <= 1; y++) {
                        let newRow: number = i + x;
                        let newCol: number = j + y;

                        if (newRow >= 0 && newRow < totalRow && newCol >= 0 && newCol < totalColumn) {
                            if (matrizCampo[newRow][newCol].hasMine) {
                                minasAoRedor++;
                            }
                        }
                    }
                }

                matrizCampo[i][j].nearMines = minasAoRedor;
            }
        }
    }
}

function printMatriz(matrizCampo: Square[][]): void {
    let totalRow: number = matrizCampo.length;
    let totalColumn: number = matrizCampo[0].length;

    for (let i = 0; i < totalRow; i++) {
        let rowString: string = '';
        for (let j = 0; j < totalColumn; j++) {
            if (matrizCampo[i][j].hasMine) {
                rowString += '[*] ';
            } else {
                rowString += '[' + matrizCampo[i][j].nearMines + '] ';
            }
        }
        console.log(rowString);
    }
}

let matrizCampo: Square[][] = criaMatrizCampo(totalRow, totalColumn);
const gabaritoCampoMinado: Square[][] = structuredClone(matrizCampo);

sorteiaMinas(gabaritoCampoMinado, qtdMinas);
contaVizinhos(gabaritoCampoMinado);

printMatriz(gabaritoCampoMinado);
console.log('___________________');
printMatriz(matrizCampo);