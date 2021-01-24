<template>
  <div class="modal-wrapper">
    <div class="modal">
      <header>
        <h1 data-role="attack-modal-name">{{ attack.name }}</h1>
        <hr />
      </header>
      <div class="modal-body">
        <div data-role="attack-modal-cost">
          <label>{{ $t("Cost") }}</label>
          <span v-for="(cost, index) in attack.cost" :key="index">{{
            cost
          }}</span>
        </div>
        <div data-role="attack-modal-damage">
          <label>{{ $t("Damage") }}</label>
          <span>{{ attack.damage }}</span>
        </div>
        <div data-role="attack-modal-desc">
          <label>{{ $t("Description") }}</label>
          <span>{{ attack.text || "-" }}</span>
        </div>
      </div>
      <footer>
        <button data-role="attack-modal-close" @click="onClose">
          {{ $t("Close") }}
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "AttacksModal",

  props: {
    attack: {
      type: Object,
      required: true
    }
  },

  methods: {
    onClose() {
      this.$emit("onClose");
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/variables.scss";
@import "@/styles/mixins.scss";

.modal-wrapper {
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5;

  .modal {
    @include elevation;
    @include flex(column);
    width: 100%;
    max-width: 350px;
    height: 100%;
    max-height: 500px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    padding: 40px;

    header {
      height: 45px;

      h1 {
        font-size: 1.4em;
        margin: 0;
      }

      hr {
        width: 100%;
      }
    }

    .modal-body {
      overflow: auto;
      max-height: calc(100% - 45px - 45px);
      margin-bottom: 20px;

      & > div {
        margin-top: 30px;

        label,
        span {
          display: block;
        }

        label {
          color: $grey-text;
          text-transform: uppercase;
          margin-bottom: 7px;
        }
      }
    }

    footer {
      @include flex(row, stretch, flex-end);
      margin-top: auto;

      button {
        @include elevation;
        border-radius: 50px;
        text-transform: uppercase;
        color: $grey-text;
        background-color: #fff;
        padding: 12px 25px;
        cursor: pointer;
      }
    }
  }
}
</style>
