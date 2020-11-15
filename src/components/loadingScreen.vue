<template>
  <div class="loading-screen">
    <div class="center">
      <spinner />
      <h5>{{ message }}</h5>
    </div>
  </div>
</template>
<script>
import spinner from '@/components/spinner'

export default {
  components: { spinner },
  props: {
    message: {
      default: "Loading..."
    }
  }
}
</script>
<style>
  .loading-screen {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(to bottom right, #209cff, #68e0cf);
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    text-align: center;
  }
  .center * {
    margin: 16px;
  }
</style>