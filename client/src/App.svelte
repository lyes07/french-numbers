<script>
  import Main from "./lib/Main.svelte";
  import Nav from "./lib/Nav.svelte";
  import Game from "./lib/Game.svelte";

  let control = { learn: true };

  function toMain() {
    control.learn = true;
  }
  function toGame() {
    control.learn = false;
  }
</script>

<div>
  <Nav />
  <!-- <link
    href="https://fonts.googleapis.com/css?family=Poppins:600&display=swap"
    rel="stylesheet"
  /> -->

  <div class="middle">
    <div class="multi-button">
      <button on:click={toMain}>Learn</button>
      <button on:click={toGame}>Games</button>
    </div>
  </div>
  {#if control.learn}
    <Main />
  {/if}
  {#if !control.learn}
    <Game />
  {/if}
</div>

<style>
  * {
    font-family: "Roboto Mono", Arial, Helvetica, sans-serif;
    font-size: large;
  }

  button {
    font-size: 5vmin;
    padding: 0.5em 1em;
    background: #fff;
    color: #4a5568;
    border: 0px solid #a0aec0;
    margin: 0.1em;
    transition:
      color 0.2s ease,
      background-color 0.2s ease,
      box-shadow 0.2s ease,
      transform 0.2s ease;
    box-shadow: 0 0 0 #bee3f8;
    transform: translateY(0);
  }
  button:first-of-type {
    border-radius: 0.5em 0 0 0.5em;
  }
  button:last-of-type {
    border-radius: 0 0.5em 0.5em 0;
  }
  /* button i {
    color: #a0aec0;
    margin-right: 0.3em;
    transition: all 0.2s ease-out;
  } */
  .multi-button:hover button {
    color: #a0aec0;
  }

  .multi-button:hover button:hover {
    background: #d53f8c;
    color: #fff;
    box-shadow: 0 0 0.8em 0 rgba(213, 63, 140, 0.8);
    transform: translateY(-0.2em);
  }
  /* .multi-button:hover button i {
    color: #cbd5e0;
  } */
  /* .multi-button:hover button:hover i {
    color: #fed7e2;
    transform: rotate(-10deg);
  } */
  .middle {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
  }
</style>
