<template>
  <div id="app">
    <Loading />
    <transition :name="transitionName">
      <router-view />
    </transition>
  </div>
</template>

<script>
import Loading from "@/components/Loading";
export default {
  components: {
    Loading
  },

  data() {
    return {
      transitionName: "slide-left"
    };
  },

  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
    }
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
  font-size: 16px;
}

::-webkit-scrollbar {
  background-color: #fff;
  width: 7px;
}

::-webkit-scrollbar-track {
  background-color: #fff;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.6);
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
}

::-webkit-scrollbar-button {
  display: none;
}

body {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

.logo {
  width: 15vw;
  position: absolute;
  left: 50%;
  top: 12px;
  z-index: 2;
  min-width: 200px;
  transform: translateX(-50%);

  @media (min-width: 992px) {
    left: 30px;
    top: 30px;
    transform: none;
  }
}

ul {
  list-style: none;
  padding: 0;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.4s;
  transition-property: opacity, transform;
  transition-timing-function: linear;
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(100%, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-100%, 0);
}
</style>
