<template>
  <input
    type="text"
    :placeholder="$t('Search') | uppercase"
    v-model="searchStr"
  />
</template>

<script>
import { SEARCH } from "@/store/action-types";
import { mapActions } from "vuex";

export default {
  name: "SearchInput",

  data() {
    return {
      searchStr: ""
    };
  },

  created() {
    this.throttle = null;
  },

  watch: {
    searchStr(newValue) {
      this.onChange(newValue);
    }
  },

  methods: {
    ...mapActions([SEARCH]),

    onChange() {
      this.debounce(() => {
        this.search();
      });
    },

    debounce(func) {
      clearTimeout(this.throttle);
      this.throttle = setTimeout(func, 500);
    },

    search() {
      this[SEARCH](this.searchStr);
    }
  },

  filters: {
    uppercase: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.toUpperCase();
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/variables.scss";
@import "@/styles/mixins.scss";

input {
  @include elevation;
  width: 70%;
  height: 45px;
  border-radius: 100px;
  padding: 15px 30px;
  position: relative;

  @media (min-width: 992px) {
    width: 30%;
    height: 50px;
  }
}
</style>
