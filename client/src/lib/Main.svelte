<script>
  import Api from "./Api";
  import Loading from "./Loading.svelte";
  import Error from "./Error.svelte";

  let sound = "/src/assets/sound.png";
  let number = getRandomNumber();
  async function getRandomNumber() {
    try {
      const res = await Api.get("/");
      const data = res.data.data[0];
      if (res.status == 200) {
        return data;
      } else {
        throw new Error(data);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  async function next() {
    number = await getRandomNumber();
  }

  function playAudio() {
    // @ts-ignore
    document.getElementById("myAudio").play();
  }
</script>

<div class="container">
  {#await number}
    <Loading />
  {:then number}
    <div id="firstCollum">
      <button id="playButton" on:click={playAudio}>
        <i>Play Sound <img src="/src/assets/sound.png" alt="sound" /></i>
      </button>
      <audio id="myAudio" src={number.audio}></audio>
      <button id="next" on:click={next}>
        <img id="sheffle" src="/src/assets/shuffle.png" alt="next number" />
      </button>
    </div>
    <div>
      <input id="number" type="number" />
    </div>
    <div>
      <h1>{number.word}</h1>
    </div>
  {:catch error}
    <Error />
  {/await}
</div>

<style>
  #number {
    width: 100%;
    height: 2rem;
    padding-left: 0.5rem;
  }
  .container {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    padding-left: 9%;
    padding-right: 9%;
    margin-top: 7%;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
  }
  .container div {
    margin-bottom: 2rem;
  }

  #playButton {
    background-color: #34dbba;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 1rem;
  }

  #playButton:hover {
    background-color: #96cef4;
  }
  img {
    width: 1rem;
    height: 1rem;
  }
  i {
    font-size: larger;
  }

  #next {
    margin: 0;
    padding: 0;
    border: none;
    background-color: unset;
  }
  #next:hover {
    cursor: pointer;
  }

  #sheffle {
    margin: 0;
    padding: 0;
    width: 2rem;
    height: 2rem;
    margin-left: 0.8rem;
  }

  #firstCollum {
    display: flex;
    align-items: center;
    flex-direction: row;
  }
  @media (max-width: 510px) {
    .container {
      flex-direction: column;
    }
  }
</style>
