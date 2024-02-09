<script>
  import Api from "./Api";

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
</script>

<div class="container">
  {#await number}
    <p>Loading...</p>
  {:then number}
    <div>
      <button id="playButton">
        <i class="glyphicon glyphicon-play">uuu</i>
      </button>
      <audio id="myAudio" src="your-audio-file.mp3"></audio>
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
    padding-left: 9%;
    padding-right: 9%;
    margin-top: 10%;
  }

  #playButton {
    background-color: #3498db;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
  }

  #playButton:hover {
    background-color: #2980b9;
  }
</style>
