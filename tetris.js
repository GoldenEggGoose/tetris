document.addEventListener("DOMContentLoaded", () => {
  let grid = document.querySelector("#grid");
  let miniGrid = document.querySelector("#miniGrid");
  let allSquares = Array.from(document.querySelectorAll("#grid div"));
  let miniGridSquares = document.querySelectorAll("#miniGrid div");
  let button = document.querySelector("#start");
  button.addEventListener("click", onButtonClick);
  const miniGridWidth = 4;
  const width = 10;
  const height = 20;
  let timeInterval = 250;
  let isRunning = false;
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

  let jBlockMiniGrid = new Block(
    [1, 2, miniGridWidth + 1, miniGridWidth * 2 + 1],
    "jBlock"
  );
  let sBlockMiniGrid = new Block(
    [
      miniGridWidth + 1,
      miniGridWidth + 2,
      miniGridWidth * 2,
      miniGridWidth * 2 + 1,
    ],
    "sBlock"
  );
  let tBlockMiniGrid = new Block(
    [1, miniGridWidth, miniGridWidth + 1, miniGridWidth + 2],
    "tBlock"
  );
  let oBlockMiniGrid = new Block(
    [0, 1, miniGridWidth, miniGridWidth + 1],
    "oBlock"
  );
  let iBlockMiniGrid = new Block(
    [1, miniGridWidth + 1, miniGridWidth * 2 + 1, miniGridWidth * 3 + 1],
    "iBlock"
  );
  let interval;
  function onButtonClick() {
    updateMiniGrid();
    if (interval === undefined) {
      interval = setInterval(() => {
        moveDown();
      }, timeInterval);
      updateButtonText("Pause");
      isRunning = true;
    } else {
      clearInterval(interval);
      interval = undefined;
      updateButtonText("Resume");
      isRunning = false;
    }
  }

  let blocks = [jBlock, sBlock, tBlock, oBlock, iBlock];
  let miniGridBlocks = [
    jBlockMiniGrid,
    sBlockMiniGrid,
    tBlockMiniGrid,
    oBlockMiniGrid,
    iBlockMiniGrid,
  ];
  const getRandomBlock = () => {
    return blocks[Math.floor(Math.random() * (blocks.length - 1))];
  };
  const getRandomRotation = () => Math.floor(Math.random() * 3);
  let currentIndex = 4;
  let currentRotation = getRandomRotation();
  let nextBlock = getRandomBlock();
  let currentBlock = getRandomBlock();
  let currentBlockIndexes = currentBlock.variations[currentRotation];
  const drawBlock = () => {
    currentBlock.variations[currentRotation].forEach((index) => {
      allSquares[currentIndex + index].classList.add(currentBlock.className);
    });
  };
  const eraseBlock = () => {
    currentBlock.variations[currentRotation].forEach((index) => {
      allSquares[currentIndex + index].classList.remove(currentBlock.className);
    });
  };
  const eraseBlockFromTheMiniGrid = () => {
    miniGridSquares.forEach((square) => {
      square.classList.remove(currentBlock.className);
    });
  };
  const updateButtonText = (buttonText) => {
    button.textContent = buttonText;
  };
  const spawnNewBlock = () => {
    currentBlock = nextBlock;
    currentIndex = 4;
    nextBlock = getRandomBlock();
    currentRotation = getRandomRotation();
    currentBlockIndexes = currentBlock.variations[currentRotation];
    drawBlock();
  };
  const getNextBlock = () => {
    return miniGridBlocks.find(
      (block) => block.className === nextBlock.className
    );
  };
  const moveRight = () => {
    let thereIsASquareAgainstTheRightWall = currentBlockIndexes.some(
      (index) => (index + currentIndex) % width === width - 1
    );
    if (!thereIsASquareAgainstTheRightWall) {
      eraseBlock();
      currentIndex++;
      if (
        currentBlockIndexes.some(
          (index) =>
            allSquares[index + currentIndex].classList.contains("occupied") ||
            allSquares[index + width + currentIndex].classList.contains("occupied")
        )
      ) {
        currentIndex--;
      }
      drawBlock();
    }
  };
  const moveLeft = () => {
    let thereIsASquareAgainstTheLeftWall = currentBlockIndexes.some(
      (index) => (index + currentIndex) % width === 0
    );
    // let thereIsAnOccupiedBlock = currentBlockIndexes.some((index) => squares[index+currentIndex-1].classList.contains("occupied"))
    if (!thereIsASquareAgainstTheLeftWall) {
      eraseBlock();
      currentIndex--;
      if (
        currentBlockIndexes.some(
          (index) =>
            allSquares[index + currentIndex].classList.contains("occupied") ||
            allSquares[index + width + currentIndex].classList.contains("occupied")
        )
      ) {
        currentIndex++;
      }
      drawBlock();
    }
  };
  const rotate = () => {
    eraseBlock();
    currentRotation++;
    currentRotation = currentRotation % 4;
    currentBlockIndexes = currentBlock.variations[currentRotation];
    let squareIsAtLeftEdge = currentBlockIndexes.some(
      (index) => (index + currentIndex) % width === 0
    );
    let squareIsAtRightEdge = currentBlockIndexes.some(
      (index) => (index + currentIndex) % width === width - 1
    );
    let someSquareIsOccupied = currentBlockIndexes.some(
      (index) =>
        allSquares[index + currentIndex].classList.contains("occupied") ||
        allSquares[index + width + currentIndex].classList.contains("occupied")
    );
    if ((squareIsAtLeftEdge && squareIsAtRightEdge) || someSquareIsOccupied) {
      currentRotation--;
      if (currentRotation < 0) {
        currentRotation += 4;
      }
      currentBlockIndexes = currentBlock.variations[currentRotation];
    }
    drawBlock();
  };
  const moveDown = () => {
    eraseBlock();
    currentIndex += width;
    drawBlock();
    checkAndHandleCollisions();
  };
  let updateMiniGrid = () => {
    eraseBlockFromTheMiniGrid();
    getNextBlock().variations.forEach((index) => {
      miniGridSquares[index].classList.add(nextBlock.className);
    });
  };
  document.addEventListener("keydown", (event) => {
    if (isRunning) {
      switch (event.code) {
        case "KeyD":
        case "ArrowRight":
          moveRight();
          break;
        case "KeyA":
        case "ArrowLeft":
          moveLeft();
          break;
        case "KeyS":
        case "ArrowDown":
          moveDown();
          break;
        case "KeyW":
        case "ArrowUp":
          rotate();
        default:
          break;
      }
    }
  });
  const checkAndHandleLineMatch = () => {
    for (let i = 0; i < allSquares.length; i += width) {
      let rowIndexes = [
        i,
        i + 1,
        i + 2,
        i + 3,
        i + 4,
        i + 5,
        i + 6,
        i + 7,
        i + 8,
        i + 9,
      ];
      let lineMatchFound = rowIndexes.every((index) => allSquares[index].classList.contains("occupied")&& !allSquares[index].classList.contains("ground"))
      if(lineMatchFound){
        rowIndexes.forEach(index => {
          allSquares[index].classList.remove("occupied", "sBlock", "oBlock", "jBlock", "tBlock", "iBlock")
        });
        let emptyRow = allSquares.splice(i, width)
        allSquares = emptyRow.concat(allSquares)
        allSquares.forEach(square => {
          grid.appendChild(square)
        });
      }
    }
  };
  const checkAndHandleCollisions = () => {
    let thereIsACollision = currentBlockIndexes.some((index) =>
      allSquares[index + currentIndex + width].classList.contains("occupied")
    );
    if (thereIsACollision) {
      currentBlockIndexes.forEach((index) => {
        allSquares[index + currentIndex].classList.add("occupied");
      });
      spawnNewBlock();
      checkAndHandleLineMatch()
      updateMiniGrid();
    }
  };
});
