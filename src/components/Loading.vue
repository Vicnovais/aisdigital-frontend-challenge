<template>
  <div class="loader-glasspane" v-if="loading">
    <div class="preloader"></div>
    <div class="loader"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Loading",

  computed: {
    ...mapState({
      loading: state => state.loading
    })
  }
};
</script>

<style scoped lang="scss">
.loader-glasspane {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  opacity: 0.5;
  background-color: #000;
  z-index: 10;
  display: block;

  .preloader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .loader {
    display: block;
    position: relative;
    left: 50%;
    top: 50%;
    width: 150px;
    height: 150px;
    margin: -75px 0 0 -75px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #08364c;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;

    &:before {
      content: "";
      position: absolute;
      top: 5px;
      left: 5px;
      right: 5px;
      bottom: 5px;
      border-radius: 50%;
      border: 3px solid transparent;
      border-top-color: #216c90;
      -webkit-animation: spin 3s linear infinite;
      animation: spin 3s linear infinite;
    }

    &:after {
      content: "";
      position: absolute;
      top: 15px;
      left: 15px;
      right: 15px;
      bottom: 15px;
      border-radius: 50%;
      border: 3px solid transparent;
      border-top-color: #3dc1d3;
      -webkit-animation: spin 1.5s linear infinite;
      animation: spin 1.5s linear infinite;
    }
  }
}

@keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes blink {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 0;
  }
}
</style>
