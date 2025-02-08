export const PUZZLE_SIZE = 4; // 4×4 grid
export const TOTAL_PIECES = PUZZLE_SIZE * PUZZLE_SIZE;

export function shuffle(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export function getBackgroundPosition(pieceId) {
  const row = Math.floor(pieceId / PUZZLE_SIZE);
  const col = pieceId % PUZZLE_SIZE;
  return `-${col * 100}px -${row * 100}px`;
}