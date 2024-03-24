<script>
  export let number;
</script>

<div class="feed">
  <span>Wrong</span>
  <span>Answer: {number}</span>
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
