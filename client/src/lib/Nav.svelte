<script>
    // @ts-ignore
    let lang = navigator.language || navigator.userLanguage; 
    lang = lang.split('-')[0].toUpperCase();
    
    const src = '/src/assets/mark.png'
</script>
  
<ul>
    <li><img {src} alt="12Fr Logo"/></li>
    <li><a href="/">Learn French Numbers</a></li>
    <li class='stickRight'><a class="active" href="/">Native Lang : {lang}</a></li>
</ul>



<style>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
  padding-left: 1rem;
  padding-right: 1rem;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover:not(.active) {
  background-color: #111;
}

.active {
  background-color: #04aa6d;
}

.stickRight {
  float: right;
}

img{
    width: 9rem;
    height: 3rem;

}

</style>
  