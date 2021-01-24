import { GET_ALL, SEARCH, NEXT_PAGE, PREV_PAGE, DETAIL } from "./action-types";
import {
  ON_GET_ALL,
  ON_SEARCH,
  ON_NEXT_PAGE,
  ON_PREV_PAGE,
  ON_DETAIL,
  START_LOADING,
  END_LOADING
} from "./mutation-types";
import PokemonAPI from "@/api/pokemon.api";

const pokemonAPI = new PokemonAPI();

export default {
  [SEARCH]: async ({ commit }, payload) => {
    commit(START_LOADING);
    const apiResult = await pokemonAPI.search(payload);
    commit(ON_SEARCH, apiResult);
    commit(END_LOADING);
  },

  [GET_ALL]: async ({ commit }) => {
    commit(START_LOADING);
    const apiResult = await pokemonAPI.get();
    commit(ON_GET_ALL, apiResult);
    commit(END_LOADING);
  },

  [NEXT_PAGE]: ({ commit }) => commit(ON_NEXT_PAGE),
  [PREV_PAGE]: ({ commit }) => commit(ON_PREV_PAGE),

  [DETAIL]: async ({ commit }, payload) => {
    commit(START_LOADING);
    const apiResult = await pokemonAPI.detail(payload);
    commit(ON_DETAIL, apiResult);
    commit(END_LOADING);
  }
};
