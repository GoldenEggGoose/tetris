document.addEventListener("DOMContentLoaded", () => {
  let grid = document.querySelector("#grid");
  let squares = document.querySelectorAll("#grid div");
  const width = 10;
  const height = 20;
  let timeInterval = 500;
  console.log(Array.from(squares));
  class Block {
    constructor(variations, className) {
      this.variations = variations;
      this.className = className;
    }
  }
  const jBlockVariations = [
    [1, 2, width + 1, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
  ];
  const sBlockVariations = [
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
  ];
  const tBlockVariations = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1],
  ];
  const oBlockVariations = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];
  const iBlockVariations = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];
  let jBlock = new Block(jBlockVariations, "jBlock");
  let sBlock = new Block(sBlockVariations, "sBlock");
  let tBlock = new Block(tBlockVariations, "tBlock");
  let oBlock = new Block(oBlockVariations, "oBlock");
  let iBlock = new Block(iBlockVariations, "iBlock");

  let blocks = [jBlock, sBlock, tBlock, oBlock, iBlock];
  const getRandomBlock = () => {
    return blocks[Math.floor(Math.random() * (blocks.length - 1))];
  };
  let currentIndex = 4;
  let currentRotation = 3;
  let currentBlock = getRandomBlock();
  const drawBlock = () => {
    currentBlock.variations[currentRotation].forEach((index) => {
      squares[currentIndex + index].classList.add(currentBlock.className);
    });
  };
  const eraseBlock = () => {
    currentBlock.variations[currentRotation].forEach((index) => {
      squares[currentIndex + index].classList.remove(currentBlock.className);
    });
  };
  setInterval(() => {
    eraseBlock()
    currentIndex = width + currentIndex;
    drawBlock();
  }, timeInterval);
});
