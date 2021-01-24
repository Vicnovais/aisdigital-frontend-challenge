import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import storeConfig from "./store.config";
import { cloneDeep } from "lodash";
import {
  SEARCH,
  GET_ALL,
  NEXT_PAGE,
  PREV_PAGE,
  DETAIL
} from "@/store/action-types";
import {
  START_LOADING,
  END_LOADING,
  ON_GET_ALL,
  ON_SEARCH,
  ON_NEXT_PAGE,
  ON_PREV_PAGE,
  ON_DETAIL
} from "@/store/mutation-types";

const localVue = createLocalVue();
localVue.use(Vuex);

const mockDatabase = [
  {
    id: "abc-123",
    name: "Alakazam",
    imageUrl: "https://images.pokemontcg.io/base5/20.png",
    types: ["Psychic"]
  },
  {
    id: "abc-456",
    name: "Blastoise",
    imageUrl: "https://images.pokemontcg.io/base5/20.png",
    types: ["Water"]
  }
];

jest.mock("@/api/pokemon.api", () => {
  return class PokemonAPI {
    constructor() {}
    search(searchStr) {
      const card = mockDatabase.filter(data => data.name.includes(searchStr));
      return [[card[0]]];
    }

    get() {
      return [mockDatabase];
    }

    detail(id) {
      return mockDatabase.filter(data => data.id === id)[0];
    }
  };
});

describe("Vuex Store", () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store(cloneDeep(storeConfig));
  });

  it("ensures initial state", () => {
    expect(store.state.loading).toBe(false);
    expect(store.state.page).toBe(1);
    expect(store.state.detailData).toStrictEqual({});
    expect(store.state.pages).toStrictEqual([]);
    expect(store.state.data).toStrictEqual([]);
    expect(store.state.carouselData).toStrictEqual([]);
  });

  it("activates loading", () => {
    store.commit(START_LOADING);
    expect(store.state.loading).toBe(true);
  });

  it("deactivates loading", () => {
    store.commit(END_LOADING);
    expect(store.state.loading).toBe(false);
  });

  it("gets all data", () => {
    const card = {
      id: "abc-123",
      name: "Alakazam",
      imageUrl: "https://images.pokemontcg.io/base5/20.png",
      types: ["Psychic"]
    };

    const payload = [[card]];

    store.commit(ON_GET_ALL, payload);
    expect(store.state.pages).toStrictEqual(payload);
    expect(store.state.data).toStrictEqual([card]);
    expect(store.state.carouselData).toStrictEqual([card]);
  });

  it("searchs data", () => {
    const card = {
      id: "abc-123",
      name: "Alakazam",
      imageUrl: "https://images.pokemontcg.io/base5/20.png",
      types: ["Psychic"]
    };

    const payload = [[card]];

    store.commit(ON_SEARCH, payload);
    expect(store.state.pages).toStrictEqual(payload);
    expect(store.state.data).toStrictEqual([card]);
    expect(store.state.carouselData).toStrictEqual([card]);
  });

  it("paginates to next page", () => {
    const card1 = {
      id: "abc-123",
      name: "Alakazam",
      imageUrl: "https://images.pokemontcg.io/base5/20.png",
      types: ["Psychic"]
    };

    const card2 = {
      id: "abc-456",
      name: "Blastoise",
      imageUrl: "https://images.pokemontcg.io/base5/20.png",
      types: ["Water"]
    };

    const payload = [[card1], [card2]];
    const initialPage = store.state.page;

    store.commit(ON_GET_ALL, payload);
    store.commit(ON_NEXT_PAGE);

    expect(store.state.page).toBe(initialPage + 1);
    expect(store.state.data).toStrictEqual([card2]);
    expect(store.state.carouselData).toStrictEqual([card1, card2]);
  });

  it("paginates to previous page", () => {
    const card1 = {
      id: "abc-123",
      name: "Alakazam",
      imageUrl: "https://images.pokemontcg.io/base5/20.png",
      types: ["Psychic"]
    };

    const card2 = {
      id: "abc-456",
      name: "Blastoise",
      imageUrl: "https://images.pokemontcg.io/base5/20.png",
      types: ["Water"]
    };

    const payload = [[card1], [card2]];
    const initialPage = store.state.page;

    store.commit(ON_GET_ALL, payload);
    store.commit(ON_NEXT_PAGE);
    store.commit(ON_PREV_PAGE);

    expect(store.state.page).toBe(initialPage);
    expect(store.state.data).toStrictEqual([card1]);
  });

  it("sets detail data", () => {
    const card = {
      id: "abc-123",
      name: "Alakazam",
      imageUrl: "https://images.pokemontcg.io/base5/20.png",
      types: ["Psychic"]
    };

    store.commit(ON_DETAIL, card);
    expect(store.state.detailData).toStrictEqual(card);
  });

  it("ensures search action", async () => {
    const action = store.dispatch(SEARCH, "Blastoise");
    expect(store.state.loading).toBe(true);

    await action;
    expect(store.state.loading).toBe(false);
    expect(store.state.data).toStrictEqual([mockDatabase[1]]);
  });

  it("ensures get all action", async () => {
    const action = store.dispatch(GET_ALL);
    expect(store.state.loading).toBe(true);

    await action;
    expect(store.state.loading).toBe(false);
    expect(store.state.data).toStrictEqual([mockDatabase[0], mockDatabase[1]]);
  });

  it("ensures next page action", () => {
    store.dispatch(NEXT_PAGE);
    expect(store.state.page).toBe(2);
  });

  it("ensures previous page action", () => {
    store.dispatch(NEXT_PAGE);
    store.dispatch(PREV_PAGE);
    expect(store.state.page).toBe(1);
  });

  it("ensures detail action", async () => {
    const action = store.dispatch(DETAIL, "abc-456");
    expect(store.state.loading).toBe(true);

    await action;
    expect(store.state.loading).toBe(false);
    expect(store.state.detailData).toStrictEqual(mockDatabase[1]);
  });
});
