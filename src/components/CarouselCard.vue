<template>
  <div class="card-wrapper">
    <div class="card-detail">
      <div class="img-wrapper">
        <img :src="card.imageUrl" :alt="`Pokémon ${card.name} card`" />
      </div>
      <div class="info-wrapper">
        <div data-role="carousel-card-id">
          <label>Id</label>
          <span>{{ card.id }}</span>
        </div>
        <div data-role="carousel-card-name">
          <label>Name</label>
          <span>{{ card.name }}</span>
        </div>
        <div data-role="carousel-card-types">
          <label>Types</label>
          <span>{{ types }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CarouselCard",

  props: {
    card: {
      type: Object,
      required: true
    }
  },

  computed: {
    types() {
      return (this.card.types && this.card.types.join(", ")) || "-";
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/variables.scss";
@import "@/styles/mixins.scss";

.card-wrapper {
  @include elevation;
  width: 50vw;
  min-width: 250px;
  max-width: 300px;
  height: auto;
  display: inline-block;
  border-radius: 15px;
  background-color: #fff;
  margin-right: 15px;

  @media (orientation: landscape) {
    max-width: 250px;
  }

  .card-detail {
    display: inline-block;
    width: 100%;

    .img-wrapper {
      width: 100%;
      height: 150px;
      position: relative;
      overflow: hidden;
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;

      img {
        width: 135%;
        margin-left: -20%;
        margin-top: -30%;
      }
    }

    .info-wrapper {
      max-height: calc(100% - 150px);
      overflow-y: auto;
      padding: 30px;

      label,
      span {
        display: block;
      }

      label {
        color: $grey-text;
        text-transform: uppercase;
        font-weight: bold;
        margin-bottom: 6px;
      }

      & > div {
        &:not(:last-child) {
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>
