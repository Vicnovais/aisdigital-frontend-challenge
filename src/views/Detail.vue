<template>
  <div class="detail-wrapper" :style="{ 'background-color': bgColor }">
    <img
      src="@/assets/pokemon_logo.png"
      class="logo"
      data-role="logo"
      alt="Logo"
    />

    <section class="detail-info-wrapper">
      <h1>{{ card.name }}</h1>
      <div class="detail-info">
        <div class="column">
          <div class="text-box" data-role="detail-id">
            <label>{{ $t("Id") }}: </label>
            <span>{{ card.id }}</span>
          </div>
          <div class="text-box" data-role="detail-types">
            <label>{{ $t("Types") }}: </label>
            <span>{{ types }}</span>
          </div>
          <div class="text-box" data-role="detail-resistances">
            <label>{{ $t("Resistances") }}: </label>
            <span>{{ resistances }}</span>
          </div>
          <div class="text-box" data-role="detail-weaknesses">
            <label>{{ $t("Weaknesses") }}: </label>
            <span>{{ weaknesses }}</span>
          </div>
        </div>
        <div class="column">
          <div class="text-box full-container" data-role="detail-attacks">
            <label>{{ $t("Attacks") }}: </label>
            <ul>
              <li
                v-for="attack in card.attacks"
                :key="attack.name"
                @click="openAttackModal(attack)"
              >
                {{ attack.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section class="detail-img">
      <img
        :src="card.imageUrlHiRes"
        :alt="`Pokémon ${card.name} card image`"
        data-role="detail-img"
      />
    </section>

    <AttacksModal
      v-if="modalVisible"
      :attack="attack"
      @onClose="onCloseModal"
      data-role="detail-attack-modal"
    />
  </div>
</template>

<script>
import AttacksModal from "@/components/AttacksModal";
import { DETAIL } from "@/store/action-types";
import { mapState, mapActions } from "vuex";

export default {
  name: "Detail",
  components: {
    AttacksModal
  },

  data() {
    return {
      modalVisible: false,
      attack: {}
    };
  },

  created() {
    this[DETAIL](this.$route.params.id);
    this.bgColors = {
      Colorless: "#fff",
      Darkness: "rgba(0, 0, 0, 0.1)",
      Dragon: "rgba(241, 196, 15, 0.2)",
      Fairy: "rgba(155, 89, 182, 0.2)",
      Fighting: "rgba(205, 97, 51, 0.2)",
      Fire: "rgba(255, 82, 82, 0.2)",
      Grass: "rgba(51, 217, 178, 0.2)",
      Lightning: "rgba(255, 218, 121, 0.2)",
      Metal: "rgba(170, 166, 157, 0.2)",
      Psychic: "rgba(112, 111, 211, 0.2)",
      Water: "rgba(52, 172, 224, 0.2)"
    };
  },

  methods: {
    ...mapActions([DETAIL]),

    openAttackModal(attack) {
      this.attack = attack;
      this.modalVisible = true;
    },

    onCloseModal() {
      this.modalVisible = false;
    }
  },

  computed: {
    ...mapState({
      card: state => state.detailData
    }),

    types() {
      return this.card.types && this.card.types.join(", ");
    },

    resistances() {
      return (
        this.card.resistances &&
        this.card.resistances
          .map(resist => `${resist.type} (${resist.value})`)
          .join(", ")
      );
    },

    weaknesses() {
      return (
        this.card.weaknesses &&
        this.card.weaknesses
          .map(resist => `${resist.type} (${resist.value})`)
          .join(", ")
      );
    },

    bgColor() {
      const mainType = this.card.types && this.card.types[0];
      if (!mainType) return "#fff";

      return this.bgColors[mainType];
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/mixins.scss";

.detail-wrapper {
  @include flex(column);
  width: 100%;
  height: auto;
  position: relative;

  @media (min-width: 992px) {
    @include flex(row);
    height: 100%;
  }

  .detail-info-wrapper {
    @include flex(column, flex-start, center);
    width: 100%;
    padding: 50px;

    @media (min-width: 992px) {
      width: 50%;
    }

    h1 {
      font-size: 2.5em;
      margin: 90px auto 25px auto;
      text-align: center;

      @media (min-width: 992px) {
        margin: 30px auto;
      }
    }

    .detail-info {
      margin-top: 15px;
      width: 100%;
      @include flex(column);

      @media (min-width: 992px) {
        @include flex(row);
      }

      .column {
        width: 100%;
        margin-bottom: 15px;

        @media (min-width: 992px) {
          width: 50%;
          margin-bottom: 0;
        }

        &:not(:last-child) {
          margin-right: 15px;
        }

        .text-box {
          @include elevation;
          padding: 20px;
          background-color: #fff;
          border-radius: 10px;

          label {
            color: #707070;
          }

          &:not(:last-child) {
            margin-bottom: 15px;
          }

          &.full-container {
            height: 100%;
          }

          ul {
            li {
              text-decoration: underline;
              cursor: pointer;

              &:not(:last-child) {
                margin-bottom: 10px;
              }
            }
          }
        }
      }
    }
  }

  .detail-img {
    @include flex(row, center, center);
    width: 100%;

    @media (min-width: 992px) {
      width: 50%;
    }

    img {
      width: 80%;
      margin-bottom: 50px;

      @media (min-width: 992px) {
        width: 55%;
        margin-bottom: 0;
      }
    }
  }
}
</style>
