<script>
  let ready = false;

  import { onMount } from "svelte";
  import Api from "./Api";

  import Loading from "./Loading.svelte";
  import Error from "./Error.svelte";

  let sound = "/src/assets/sound.png";
  let list = [];
  async function getListOfRandomNumbers() {
    try {
      const res = await Api.get("/fr/game/");
      const data = res.data.data;
      if (res.status === 200) {
        list = data;
      } else {
        throw new Error(data);
      }
    } catch (err) {
      console.error(err.message);
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
            {rowIndex}, {columnIndex}
          </button>
        {/each}
      {/each}
    </div>
  {/if}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 100px);
    gap: 5px;
  }

  .box {
    background-color: lightgray;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: none;
    outline: none;
  }

  .box.clicked {
    background-color: green;
  }

  .middle {
    display: flex;
    justify-content: center;
  }
</style>
