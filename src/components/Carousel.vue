<template>
  <div class="carousel-wrapper" ref="carousel">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Carousel",

  mounted: function() {
    this.$refs.carousel.addEventListener("scroll", this.onScroll);
  },

  beforeDestroy: function() {
    this.$refs.carousel.removeEventListener("scroll", this.onScroll);
  },

  methods: {
    onScroll() {
      const carousel = this.$refs.carousel,
        { scrollWidth, scrollLeft, offsetWidth } = carousel;

      if (scrollWidth - scrollLeft <= offsetWidth) this.scrollEnd();
    },

    scrollEnd() {
      this.$emit("scrollEnd");
    }
  }
};
</script>

<style scoped lang="scss">
.carousel-wrapper {
  width: 100vw;
  overflow-x: scroll;
  white-space: nowrap;
  padding: 15px;
}
</style>
