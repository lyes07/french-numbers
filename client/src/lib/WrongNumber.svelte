<script>
  export let number;
</script>

<div role="alert" class="feed">
  <strong class="title"> Wrong Answer </strong>

  <p class="ret">
    Answer: {number}
  </p>
</div>

<style>
  .feed {
    padding: 1rem;
    border-radius: 0.25rem;
    border-color: #ef4444;
    background-color: #fef2f2;
  }
  .title {
    display: block;
    font-weight: 500;
    color: #991b1b;
  }
  .ret {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: #b91c1c;
  }
</style>
