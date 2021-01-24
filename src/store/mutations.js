import {
  ON_GET_ALL,
  ON_SEARCH,
  ON_NEXT_PAGE,
  ON_PREV_PAGE,
  ON_DETAIL,
  START_LOADING,
  END_LOADING
} from "./mutation-types";

const mapData = data => {
  return data.map(card => ({
    imageUrl: card.imageUrl,
    id: card.id,
    name: card.name,
    types: card.types
  }));
};

export default {
  [ON_GET_ALL]: (state, payload) => {
    const targetPage = payload[0];
    const data = mapData(targetPage);

    state.page = 1;
    state.pages = payload;
    state.data = data;
    state.carouselData = data;
  },

  [ON_SEARCH]: (state, payload) => {
    const targetPage = payload[0];
    if (!targetPage) return false;
    const data = mapData(targetPage);

    state.page = 1;
    state.pages = payload;
    state.data = data;
    state.carouselData = data;
  },

  [ON_NEXT_PAGE]: state => {
    state.page += 1;
    const targetPage = state.pages[state.page - 1];
    if (!targetPage) return false;
    const data = mapData(targetPage);

    state.data = data;
    state.carouselData = state.carouselData.concat(data);
  },

  [ON_PREV_PAGE]: state => {
    state.page -= 1;
    const targetPage = state.pages[state.page - 1];
    if (!targetPage) return false;
    const data = mapData(targetPage);

    state.data = data;
  },

  [ON_DETAIL]: (state, payload) => (state.detailData = payload),
  [START_LOADING]: state => (state.loading = true),
  [END_LOADING]: state => (state.loading = false)
};
