export function getBoxBottomPoints(matrix, initPoint) {
  const row = matrix.length;
  const col = matrix[0].length;

  const points = [];

  for (let j = 0; j < col; j++) {
    // point
    const x = j;
    const y = row - 1 + initPoint.y;

    //     if (box.shape[y][x]) {
    //       const point = {
    //         x,
    //         y,
    //       };
    //       points.push(point);
    //     }
    points.push({
      x,
      y,
    });
  }

  return points;
}
