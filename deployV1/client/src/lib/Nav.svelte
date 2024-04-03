<script>
  // @ts-ignore
  let lang = navigator.language || navigator.userLanguage;
  lang = lang.split("-")[0].toUpperCase();

  const src = "/mark.png";
</script>

<ul>
  <li><img {src} alt="12Fr Logo" /></li>
  <li><a href="/">Learn French Numbers</a></li>
  <li class="stickRight">
    <a class="active" href="/">Lang : {lang}</a>
  </li>
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
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-style: italic;
  }

  li a:hover:not(.active) {
    background-color: #111;
  }

  .active {
    background-color: #04aa6d;
  }

  .stickRight {
    float: right;
    display: none;
  }

  img {
    width: 9rem;
    height: 3rem;
  }
  li {
    font-size: larger;
  }
  @media (max-width: 450px) {
    img {
      width: 8rem;
    }
    li img {
      scale: 0.8;
    }
    li {
      font-size: large;
    }
  }
  @media (max-width: 400px) {
    li img {
      scale: 0.6;
    }
    li {
      font-size: medium;
    }
  }
</style>
