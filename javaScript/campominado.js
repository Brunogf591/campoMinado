const math = require('mathjs');

let Square = {
    row: 0,
    column: 0,
    state: "closed", // Pode ser: closed, opened, flagged
    hasMine: false,
    nearMines: 0 // Número de minas em volta
};

let totalRow = 5;
let totalColumn = 5;
let qtdMinas = 5;

function criaSquare(row, col) {
    let square = Object.create(Square);
    square.row = row;
    square.column = col;
    return square;
}

function criaMatrizCampo(rows, cols) {
    let matrizCampo = [];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            let square = criaSquare(i, j);
            row.push(square);
        }
        matrizCampo.push(row);
    }
    return matrizCampo;
}

function sorteiaMinas(matrizCampo, qtdMinas) {
    let totalRow = matrizCampo.length;
    let totalColumn = matrizCampo[0].length;
    let minasSorteadas = 0;

    while (minasSorteadas < qtdMinas) {
        let row = math.floor(totalRow * Math.random());
        let col = math.floor(totalColumn * Math.random());

        if (!matrizCampo[row][col].hasMine) {
            matrizCampo[row][col].hasMine = true;
            minasSorteadas++;
        }
    }
}

function contaVizinhos(matrizCampo) {
    let totalRow = matrizCampo.length;
    let totalColumn = matrizCampo[0].length;

    for (let i = 0; i < totalRow; i++) {
        for (let j = 0; j < totalColumn; j++) {
            if (!matrizCampo[i][j].hasMine) {
                let minasAoRedor = 0;

                for (let x = -1; x <= 1; x++) {
                    for (let y = -1; y <= 1; y++) {
                        let newRow = i + x;
                        let newCol = j + y;

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

function printMatriz(matrizCampo) {
    let totalRow = matrizCampo.length;
    let totalColumn = matrizCampo[0].length;

    for (let i = 0; i < totalRow; i++) {
        let rowString = '';
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

let matrizCampo = criaMatrizCampo(totalRow, totalColumn);
const gabaritoCampoMinado = structuredClone(matrizCampo);

sorteiaMinas(gabaritoCampoMinado, qtdMinas);
contaVizinhos(gabaritoCampoMinado);

printMatriz(gabaritoCampoMinado);
console.log('___________________');
printMatriz(matrizCampo)