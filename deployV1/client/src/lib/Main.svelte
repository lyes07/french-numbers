<script>
  import { onMount } from "svelte";
  import Api from "./Api";

  import Loading from "./Loading.svelte";
  import Error from "./Error.svelte";
  import Correct from "./Correct.svelte";
  import WrongNumber from "./WrongNumber.svelte";
  import WrongWord from "./WrongWord.svelte";

  let feedback = 0;
  let number;
  let sound = "/sound.png";

  async function getRandomNumber() {
    try {
      const res = await Api.get("/fr/");
      const data = res.data.data[0];
      if (res.status === 200) {
        number = data;
      } else {
        throw new Error(data);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  async function next() {
    await getRandomNumber();
  }

  function playAudio() {
    const audioElement = document.getElementById("myAudio");
    if (audioElement) {
      // @ts-ignore
      audioElement.play();
    }
  }

  function numberButtonCheck() {
    // @ts-ignore
    const numberInput = document.getElementById("numberInput").value;

    if (!isNaN(parseInt(numberInput))) {
      const num = parseInt(numberInput);

      if (num === number.id) {
        feedback = 1;
        // @ts-ignore

        document.getElementById("numberInput").value = "";
      } else {
        feedback = 2;
      }
    }
  }

  function wordButtonCheck() {
    // @ts-ignore

    const wordInput = document.getElementById("wordInput").value;

    if (wordInput.length > 1) {
      const word = wordInput.toLowerCase();

      if (word === number.word) {
        feedback = 1;
        // @ts-ignore

        document.getElementById("wordInput").value = "";
      } else {
        feedback = 3;
      }
    }
  }

  onMount(async () => {
    await getRandomNumber();
  });
</script>

<div class="contmain">
  {#if number === undefined}
    <Loading />
  {:else}
    <div id="firstCollum">
      <button id="playButton" on:click={playAudio}>
        <i>Play Sound <img src={sound} alt="sound" /></i>
      </button>
      <audio id="myAudio" src={"data:audio/mpeg;base64," + number.audio}
      ></audio>
      <button id="next" on:click={next}>
        <img id="sheffle" src="/shuffle.png" alt="next number" />
      </button>
    </div>
    <div class="co" style="margin-bottom: 0;">
      <div class="cont" style="margin-bottom: 0;">
        <div class="container__item">
          <form class="form" autocomplete="off">
            <input
              id="numberInput"
              type="number"
              class="form__field"
              placeholder="Number ex: 38"
            />
            <button
              type="button"
              class="btn btn--primary btn--inside uppercase"
              on:click={numberButtonCheck}>Check</button
            >
          </form>
        </div>

        <div class="container__item">
          <form class="form" autocomplete="off">
            <input
              id="wordInput"
              type="text"
              class="form__field"
              placeholder="Word ex: Huit"
              autocomplete="off"
            />
            <button
              type="button"
              class="word-button btn btn--primary btn--inside uppercase"
              on:click={wordButtonCheck}>Check</button
            >
          </form>
        </div>
      </div>
    </div>
    <div class="feedback">
      <h1>Feedback:</h1>
      {#if feedback === 1}
        <Correct />
      {:else if feedback === 2}
        <WrongNumber number={number.id} />
      {:else if feedback === 3}
        <WrongWord word={number.word} />
      {/if}
    </div>
  {/if}
</div>

<style>
  .contmain {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    padding-left: 9%;
    padding-right: 9%;
    margin-top: 7%;
    margin-bottom: 7%;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
  }
  .contmain div {
    margin-bottom: 2rem;
  }

  #playButton {
    background-color: #34dbba;
    color: #545353;
    font-weight: 700;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 1rem;
    height: 4rem;
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
  @media (max-width: 538px) {
    .contmain {
      flex-direction: column;
    }
    .form__field {
      width: 50%;
      max-width: 260px;
    }
    .btn--primary {
      padding: 8px 18px;
    }
  }

  @media (max-width: 415px) {
    .contmain {
      flex-direction: column;
    }
    .form__field {
      width: 50%;
      max-width: 200px;
    }

    .btn--primary {
      padding: 8px 18px;
    }
  }
  @media (max-width: 350px) {
    .contmain {
      flex-direction: column;
    }
    .form__field {
      width: 50%;
      max-width: 150px;
    }

    .btn--primary {
      padding: 8px 18px;
    }
  }
  @media (max-width: 780px) {
    .contmain {
      flex-direction: column;
    }
    .feedback {
      width: 70%;
      margin-right: 20%;
      display: flex;
      justify-content: center;
      flex-direction: column;
    }
  }

  .co {
    margin-bottom: 0;
  }
  .cont {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 0;
  }

  .uppercase {
    text-transform: uppercase;
  }

  .btn {
    display: inline-block;
    background: transparent;
    color: inherit;
    font: inherit;
    border: 0;
    outline: 0;
    padding: 0;
    transition: all 200ms ease-in;
    cursor: pointer;
  }
  .btn--primary {
    background: #7f8ff4;
    color: #fff;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    padding: 12px 36px;
  }
  .btn:hover {
    background: darken(#7f8ff4, 4%);
  }

  .btn:active {
    background: #7f8ff4;
    box-shadow: inset 0 0 10px 2px rgba(0, 0, 0, 0.2);
  }

  .btn--inside {
    margin-left: -96px;
  }

  .form__field {
    width: 360px;
    background: #fff;
    color: #a3a3a3;
    font: inherit;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
    border: 0;
    outline: 0;
    padding: 22px 18px;
  }

  .feedback {
    width: 22%;
    /* background-color: #34dbba; */
  }
</style>
