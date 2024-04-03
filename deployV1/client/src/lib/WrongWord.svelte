<script>
  export let word;
</script>

<div class="feed">
  <span>Wrong</span>
  <span>Answer: {word}</span>
</div>

<style>
  .feed {
    display: flex;
    flex-direction: column;
  }
  span {
    font-weight: bold;
    color: #be2a27;
  }
</style>
