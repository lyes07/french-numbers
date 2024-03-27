<script>
  // so see if the game implementaion is finished
  let ready = true;

  import { onMount } from "svelte";
  import Api from "./Api";

  import Loading from "./Loading.svelte";
  import Error from "./Error.svelte";

  let list = [];
  let gridData = [];
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
        let numbers = [];
        let words = [];

        for (let i = 0; i < list.length; i++) {
          numbers[i] = list[i].id;
          words[i] = list[i].word;
        }
        gridData = shuffle([...shuffle(numbers), ...shuffle(words)]);
      }
    }
  }

  function playAudio() {
    const audioElement = document.getElementById("myAudio");
    if (audioElement) {
      // @ts-ignore
      audioElement.play();
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

  function handleClick(row, column) {
    grid[row][column] = !grid[row][column];
  }
</script>

<div class="container">
  {#if list === undefined}
    <Loading />
  {:else if !ready}
    <Error />
    <h1 class="middle">Comming Soon</h1>
  {:else}
    <div class="grid">
      {#each grid as row, rowIndex}
        {#each row as box, columnIndex}
          <button
            class="box {box ? 'clicked' : ''}"
            on:click={() => handleClick(rowIndex, columnIndex)}
            aria-pressed={box}
          >
            {gridData[rowIndex * 4 + columnIndex]}
            <!-- {rowIndex}, {columnIndex} -->
          </button>
        {/each}
      {/each}
    </div>
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
</style>
