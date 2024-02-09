<!-- function Body() {
    const [num, setNum] = useState({ audio: "hhhe", id: 1, word: "ww" });
  
    const getRandomNumber = async () => {
      try {
        const res = await api.get("/");
        setNum(res.data.data[0]);
        console.log(res.data.data[0]);
        console.log(num);
      } catch (err) {
        console.error(err.message);
      } finally {
        console.log(num);
        after();
      }
    };
  
    useEffect(() => {
      getRandomNumber();
      console.log(num);
      after();
    }, []);
  
    function after() {
      console.log(num);
    } -->


<div class='container'>
    <div>
        <button id='playButton'>
          <i class='glyphicon glyphicon-play'>uuu</i> 
        </button>
        <audio id='myAudio' src='your-audio-file.mp3'></audio>
    </div>
    <h1>ttt</h1>
    <h1>222</h1>
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