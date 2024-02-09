<script>
  import Api from "./Api";

  let sound = "/src/assets/sound.png";
  let number = getRandomNumber();
  async function getRandomNumber() {
    try {
      const res = await Api.get("/");
      const data = res.data.data[0];
      console.log(res.status);
      if (res.status == 200) {
        return data;
      } else {
        throw new Error(data);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  function playAudio() {
    // @ts-ignore
    document.getElementById("myAudio").play();
  }
</script>

<div class="container">
  {#await number}
    <p>Loading...</p>
  {:then number}
    <div>
      <button id="playButton" on:click={playAudio}>
        <i>Play Sound <img src="/src/assets/sound.png" alt="sound" /></i>
      </button>
      <audio id="myAudio" src={number.audio}></audio>
    </div>
    <h1>{number.id}</h1>
    <h1>{number.word}</h1>
  {:catch error}
    <p>Error...</p>
  {/await}
</div>

<style>
  .container {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    align-items: center;
    padding-left: 9%;
    padding-right: 9%;
    margin-top: 10%;
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
</style>
