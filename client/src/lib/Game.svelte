<script>
  let grid = [];

  // Initialize the grid
  for (let i = 0; i < 3; i++) {
    grid.push(Array(4).fill(false));
  }

  function handleClick(row, column) {
    grid[row][column] = !grid[row][column];
  }
</script>

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
</style>
