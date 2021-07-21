import { gameRow, gameCol } from "./config";
// map

export function initMap(map) {
  // init map
  for (let i = 0; i < gameRow; i++) {
    map[i] = [];
    for (let j = 0; j < gameCol; j++) {
      map[i][j] = 0;
    }
  }
}
