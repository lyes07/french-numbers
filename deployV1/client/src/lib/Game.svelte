<script>
  import { onMount } from "svelte";
  import Api from "./Api";
  import Loading from "./Loading.svelte";

  let list = [];
  let numbers = [];
  let words = [];
  let gridData = [];
  let selectedBox = null;
  let matchedBoxes = [];
  let gameOver = false;

  async function getListOfRandomNumbers() {
    let isError = false;
    try {
      const res = await Api.get("/fr/game/");
      const data = res.data.data;
      if (res.status === 200) {
        list = data;
      } else {
        isError = true;
        throw new Error(data);
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      if (!isError) {
        for (let i = 0; i < list.length; i++) {
          numbers[i] = list[i].id;
          words[i] = list[i].word;
        }
        let tempNumbers = [...numbers];
        let tempWords = [...words];
        gridData = shuffle([...shuffle(tempNumbers), ...shuffle(tempWords)]);
      }
    }
  }

  onMount(async () => {
    await getListOfRandomNumbers();
  });

  function shuffle(array) {
    var m = array.length,
      t,
      i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }

  let grid = [];

  for (let i = 0; i < 3; i++) {
    grid.push(Array(4).fill(false));
  }

  function isItAMatch(firstIndex, secondIndex) {
    let boxes = document.querySelectorAll(".box");
    // @ts-ignore
    let first = boxes[firstIndex].childNodes[0].data;
    // @ts-ignore
    let second = boxes[secondIndex].childNodes[0].data;

    // the checking logic

    let number;
    let word;

    if (!isNaN(+first)) {
      number = first;
      word = second;
    } else {
      number = second;
      word = first;
    }

    let numberIndex;
    let wordIndex;

    let len = 6; // numbers.length    or    words.length

    for (let i = 0; i < len; i++) {
      if (number == numbers[i]) {
        numberIndex = i;
        break;
      }
    }
    for (let i = 0; i < len; i++) {
      if (word == words[i]) {
        wordIndex = i;
        break;
      }
    }

    return numberIndex == wordIndex;
  }

  function disableCorrectBoxes(firstIndex, secondIndex) {
    let boxes = document.querySelectorAll(".box");
    // @ts-ignore
    let first = boxes[firstIndex];
    // @ts-ignore
    let second = boxes[secondIndex];

    // @ts-ignore
    first.style.visibility = "hidden";
    // @ts-ignore
    second.style.visibility = "hidden";
    // @ts-ignore
    first.style.opacity = "0";
    // @ts-ignore
    second.style.opacity = "0";
  }

  function handleClick(row, column) {
    if (grid[row][column] === false && selectedBox !== null) {
      if (
        isItAMatch(row * 4 + column, (selectedBox >> 2) * 4 + (selectedBox & 3))
      ) {
        matchedBoxes.push(row * 4 + column);
        matchedBoxes.push(selectedBox);
        console.log(matchedBoxes);
        disableCorrectBoxes(
          row * 4 + column,
          (selectedBox >> 2) * 4 + (selectedBox & 3)
        );
        selectedBox = null;
        if (matchedBoxes.length === 12) {
          gameOver = true;
        }
      } else {
        setTimeout(() => {
          grid[selectedBox >> 2][selectedBox & 3] = false;
          grid[row][column] = false;
          selectedBox = null;
        }, 1000);
      }
    } else if (grid[row][column] === false && selectedBox === null) {
      selectedBox = row * 4 + column;
      grid[row][column] = true;
    } else if (grid[row][column] === true && selectedBox === row * 4 + column) {
      grid[row][column] = false;
      selectedBox = null;
    }
  }

  function isBoxDisabled(index) {
    return matchedBoxes.includes(index);
  }

  function resetGame() {
    window.location.reload();
  }
</script>

<div class="container">
  {#if list === undefined}
    <Loading />
  {:else}
    <div class="grid">
      {#each grid as row, rowIndex}
        {#each row as box, columnIndex}
          {#if !isBoxDisabled(rowIndex * 4 + columnIndex)}
            <button
              class="box {box ? 'clicked' : ''}"
              on:click={() => handleClick(rowIndex, columnIndex)}
              aria-pressed={box}
            >
              {gridData[rowIndex * 4 + columnIndex]}
            </button>
          {:else}
            <button class="box" disabled></button>
          {/if}
        {/each}
      {/each}
    </div>
    {#if gameOver}
      <div class="middle">
        <button class="reload" on:click={resetGame}>Replay?</button>
      </div>
    {/if}
  {/if}
</div>

<style>
  .container {
    margin: 3rem 10%;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 100px);
    gap: 5px;
  }

  button {
    font-size: large;
    font-weight: bold;
  }

  .box {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: 2px solid transparent;
    border-radius: 0.5rem;
    outline: none;
  }

  .box.clicked {
    background-color: rgb(88, 221, 88);
  }

  .middle {
    display: flex;
    justify-content: center;
  }

  .reload {
    border: 2px solid black;
    border-radius: 0.5rem;
    padding: 14px 28px;
    cursor: pointer;
    border-color: #e7e7e7;
  }

  .reload:hover {
    transition: 0.5s;
    background: #e7e7e7;
    color: black;
  }
</style>
