<template>
  <div class="grid-wrapper">
    <header>
      <div
        v-for="column in columns"
        :key="column.name"
        :style="getColumnStyle(column)"
      >
        {{ column.name }}
      </div>
    </header>

    <ul>
      <li v-for="row in data" :key="row.id" @click="onClickLine(row)">
        <div
          v-for="(value, propertyName, index) in row"
          :key="index"
          :style="getColumnStyle(columns[index])"
        >
          <div
            v-if="columns[index].type && columns[index].type === 'image'"
            class="image-wrapper"
          >
            <img :src="value" />
          </div>
          <span v-else-if="Array.isArray(value)">{{ value.join(", ") }}</span>
          <span v-else>{{ value }}</span>
        </div>
      </li>
    </ul>

    <div class="paginator">
      <button
        data-role="prev"
        :class="{ disabled: page === 1 }"
        @click="onPrev"
      ></button>
      <span data-role="page">{{ page }}</span>
      <button
        data-role="next"
        :class="{ disabled: page === pageCount }"
        @click="onNext"
      ></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "DataGrid",
  props: {
    columns: {
      type: Array,
      required: true
    },

    data: {
      type: Array,
      required: true
    },

    page: {
      type: Number,
      required: true
    },

    pageCount: {
      type: Number,
      required: true
    }
  },

  methods: {
    getColumnStyle(columnCfg) {
      const widthCfg = columnCfg.width;
      let style = {};

      if (widthCfg.endsWith("px")) style.width = widthCfg;
      else style.flex = widthCfg;

      return style;
    },

    onPrev() {
      if (this.page > 1) this.$emit("onPrev");
    },

    onNext() {
      if (this.page < this.pageCount) this.$emit("onNext");
    },

    onClickLine(row) {
      this.$emit("onClickLine", row);
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/variables.scss";
@import "@/styles/mixins.scss";

.grid-wrapper {
  width: 100%;

  header {
    @include flex(row);
    width: 100%;

    div {
      color: $grey-text;
      text-transform: uppercase;
      font-size: 0.8em;
      font-weight: bold;
    }
  }

  ul {
    width: 100%;

    li {
      @include elevation;
      @include flex(row, center);
      width: 100%;
      height: 70px;
      border-radius: 20px;
      padding: 20px 0;

      &:not(:last-child) {
        margin-bottom: 20px;
      }

      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
        cursor: pointer;
      }

      .image-wrapper {
        width: 50px;
        height: 50px;
        position: relative;
        overflow: hidden;
        border-radius: 50%;
        margin: 0 auto;

        img {
          display: inline;
          margin: 0 auto;
          margin-left: -100%;
          margin-top: -55%;
          height: 200px;
        }
      }
    }
  }

  .paginator {
    @include flex(row, center, center);
    margin-top: 40px;

    & > * {
      &:not(:last-child) {
        margin-right: 10px;
      }
    }

    button {
      width: 35px;
      height: 35px;
      background-color: $red;
      position: relative;
      border-radius: 100%;
      border: none;
      cursor: pointer;

      &.disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }

      &:before {
        color: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 1.3em;
      }

      &[data-role="prev"] {
        &:before {
          content: "<";
        }
      }

      &[data-role="next"] {
        &:before {
          content: ">";
        }
      }
    }
  }
}
</style>
