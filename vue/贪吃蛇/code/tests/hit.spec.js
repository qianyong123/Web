import { hitBorder } from "../src/game/hit";
import { gameRow } from "../src/game/config";

test("当box 到底的时候， 应该返回 true", () => {
  // gameRow = 10
  const box = {
    x: 0,
    y: gameRow - 1,
    shape: [
      [1, 1],
      [1, 1],
    ],
  };

  const map = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ];

  expect(hitBorder(box)).toBe(true);
});
