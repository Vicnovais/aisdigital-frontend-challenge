<template>
  <div class="home-wrapper">
    <img
      src="@/assets/pokemon_logo.png"
      alt="Logo"
      class="logo"
      data-role="logo"
    />
    <svg
      class="background"
      width="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path
        d="M0,0
              L100,0
              L100,65
              L0,100z"
        fill="#e74c3c"
      ></path>
    </svg>
    <SearchInput class="search" data-role="search" />

    <div class="desktop-wrapper" v-if="!isMobile">
      <section class="data-grid" data-role="grid">
        <DataGrid
          :columns="columns"
          :data="data"
          :loading="false"
          :page="page"
          :pageCount="pageCount"
          @onPrev="prevPage"
          @onNext="nextPage"
          @onClickLine="onDetail"
        />
      </section>
    </div>
    <div v-else>
      <Carousel class="carousel" @scrollEnd="nextPage" data-role="carousel">
        <CarouselCard
          v-for="card in carouselData"
          :key="card.id"
          :card="card"
          @click.native="onDetail(card)"
          data-role="carousel-card"
        />
      </Carousel>
    </div>
  </div>
</template>

<script>
import SearchInput from "@/components/SearchInput";
import DataGrid from "@/components/DataGrid";
import Carousel from "@/components/Carousel";
import CarouselCard from "@/components/CarouselCard";
import { GET_ALL, NEXT_PAGE, PREV_PAGE } from "@/store/action-types";
import { mapState, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    SearchInput,
    DataGrid,
    Carousel,
    CarouselCard
  },

  data() {
    return {
      windowWidth: window.innerWidth,
      columns: [
        { name: "", width: "100px", type: "image" },
        { name: this.$i18n.t("Id"), width: "1" },
        { name: this.$i18n.t("Name"), width: "2" },
        { name: this.$i18n.t("Types"), width: "2" }
      ]
    };
  },

  mounted() {
    window.onresize = () => {
      this.windowWidth = window.innerWidth;
    };
  },

  computed: {
    ...mapState({
      data: state => state.data,
      page: state => state.page,
      pages: state => state.pages,
      carouselData: state => state.carouselData
    }),

    pageCount() {
      return this.pages.length;
    },

    isMobile() {
      return (
        this.windowWidth <= 760 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      );
    }
  },

  methods: {
    ...mapActions([GET_ALL, NEXT_PAGE, PREV_PAGE]),

    nextPage() {
      this[NEXT_PAGE]();
    },

    prevPage() {
      this[PREV_PAGE]();
    },

    onDetail(datum) {
      this.$router.push({ name: "Detail", params: { id: datum.id } });
    }
  },

  created() {
    this[GET_ALL]({ page: 1 });
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/variables.scss";
@import "@/styles/mixins.scss";

.home-wrapper {
  width: 100%;
  height: 100%;
  position: relative;

  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50vh;
    z-index: 1;
  }

  .search {
    position: relative;
    z-index: 3;
    margin-bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 120px;

    @media (orientation: landscape) {
      z-index: 5;
    }

    @media (min-width: 992px) {
      margin-top: 70px;
    }
  }

  .desktop-wrapper {
    width: 100%;
    @include flex(row, center, center);

    .data-grid {
      @include elevation;
      width: 80%;
      padding: 40px;
      border-radius: 15px;
      margin-top: 30px;
      position: relative;
      z-index: 3;
      background-color: #fff;
    }
  }

  .carousel {
    position: relative;
    z-index: 2;
  }
}
</style>
