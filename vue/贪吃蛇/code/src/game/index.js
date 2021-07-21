export * from "./config";
import { gameRow, gameCol } from "./config";
import { initMap } from "./map";
import { render } from "./renderer";
import { addTicker } from "./ticker";
import { intervalTimer } from "./utils";
import { getBoxBottomPoints } from "./matrix";
import { hitBorder } from "./hit";

export function startGame(map) {
  initMap(map);

  const box = {
    x: 0,
    y: 0,
    shape: [
      [1, 1],
      [1, 1],
    ],
  };

  const isDownMove = intervalTimer();

  function handleTicker(n) {
    if (isDownMove(n, 1000)) {

      if (hitBorder(box)) {
        return;
      }

      box.y++;
    }
    render(box, map);
  }

  window.addEventListener("keydown", (e) => {
    if (e.code === "ArrowDown") {
      box.y++;
    }
  });

  addTicker(handleTicker);
}
