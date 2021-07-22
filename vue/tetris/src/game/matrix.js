export function getBoxBottomPoints(matrix) {
  // TODO 还是有问题
  const row = matrix.length;
  const col = matrix[0].length;

  const points = [];

  for (let j = 0; j < col; j++) {
    const x = j;
    const y = row - 1;

    if (matrix[y][x] > 0) {
      points.push({
        x,
        y,
      });
    }
  }

  return points;
}

export function rotate(matrix) {
  const row = matrix.length;
  const col = matrix[0].length;

  let r = [];

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      let k = row - 1 - j;
      if (!r[k]) {
        r[k] = [];
      }

      r[k][i] = matrix[i][j];
    }
  }

  return r;
}
