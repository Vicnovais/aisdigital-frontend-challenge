import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Loading from "@/components/Loading.vue";
import SearchInput from "@/components/SearchInput.vue";
import Carousel from "@/components/Carousel.vue";
import CarouselCard from "@/components/CarouselCard.vue";
import AttacksModal from "@/components/AttacksModal.vue";
import DataGrid from "@/components/DataGrid.vue";
import Home from "@/views/Home.vue";
import Detail from "@/views/Detail.vue";
import {
  SEARCH,
  GET_ALL,
  NEXT_PAGE,
  PREV_PAGE,
  DETAIL
} from "@/store/action-types";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Loading.vue", () => {
  let state, store;

  beforeEach(() => {
    state = {
      loading: false
    };

    store = new Vuex.Store({
      state
    });
  });

  it("ensures loading inactive", () => {
    const wrapper = shallowMount(Loading, { store, localVue });
    expect(wrapper.find(".loader-glasspane").exists()).toBe(false);
  });

  it("ensures loading active", async () => {
    const wrapper = shallowMount(Loading, { store, localVue });

    state.loading = true;
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".loader-glasspane").exists()).toBe(true);
  });
});

describe("SearchInput.vue", () => {
  let actions, store;

  beforeEach(() => {
    actions = {
      SEARCH: jest.fn()
    };

    store = new Vuex.Store({
      actions
    });
  });

  it("ensures initial data", () => {
    const wrapper = shallowMount(SearchInput, {
      localVue,
      mocks: {
        $t: str => str
      }
    });
    expect(wrapper.vm.searchStr).toBe("");
  });

  it("ensures debounce", async () => {
    const wrapper = shallowMount(SearchInput, {
      store,
      localVue,
      mocks: {
        $t: str => str
      }
    });
    const spy = jest.spyOn(wrapper.vm, "debounce");

    wrapper.vm.onChange();
    expect(spy).toHaveBeenCalled();
  });

  it("ensures search action", async () => {
    const wrapper = shallowMount(SearchInput, {
      store,
      localVue,
      mocks: {
        $t: str => str
      }
    });

    wrapper.vm.search();
    expect(actions[SEARCH]).toHaveBeenCalled();
  });
});

describe("Carousel.vue", () => {
  it("ensures scroll end", () => {
    const wrapper = shallowMount(Carousel, {
      localVue,
      mocks: {
        $t: str => str
      }
    });
    const spy = jest.spyOn(wrapper.vm, "scrollEnd");

    wrapper.vm.$refs.carousel = {};
    wrapper.vm.$refs.carousel.offsetWidth = 375;
    wrapper.vm.$refs.carousel.scrollWidth = 1000;
    wrapper.vm.$refs.carousel.scrollLeft = 625;
    wrapper.vm.onScroll();
    expect(spy).toHaveBeenCalled();
    expect(wrapper.emitted().scrollEnd).toBeTruthy();
  });
});

describe("CarouselCard.vue", () => {
  it("ensures types", () => {
    const card = {
      id: "abc-123",
      name: "Slowking",
      types: ["Water", "Psychic"]
    };

    const wrapper = shallowMount(CarouselCard, {
      propsData: { card },
      mocks: {
        $t: str => str
      }
    });

    expect(wrapper.vm.types).toBe("Water, Psychic");
  });

  it("ensures empty types", () => {
    const card = {
      id: "abc-123",
      name: "Slowking",
      types: []
    };

    const wrapper = shallowMount(CarouselCard, {
      propsData: { card },
      mocks: {
        $t: str => str
      }
    });

    expect(wrapper.vm.types).toBe("-");
  });
});

describe("AttacksModal.vue", () => {
  it("ensures closing", () => {
    const attack = {
      name: "Telekinesis",
      cost: ["Psychic"],
      damage: 50,
      text: "Psychic attack"
    };

    const wrapper = shallowMount(AttacksModal, {
      propsData: { attack },
      mocks: {
        $t: str => str
      }
    });

    wrapper.vm.onClose();
    expect(wrapper.emitted().onClose).toBeTruthy();
  });
});

describe("DataGrid.vue", () => {
  let page = 1;
  const pageCount = 5;
  const columns = [
    { name: "", width: "100px", type: "image" },
    { name: "Id", width: "1" },
    { name: "Name", width: "2" },
    { name: "Types", width: "2" }
  ];

  const data = [
    { id: "abc-123", name: "Blastoise", image: "img", types: ["Water"] }
  ];

  it("ensures column style", () => {
    const wrapper = shallowMount(DataGrid, {
      propsData: { columns, data, page, pageCount }
    });

    const styleFlex = wrapper.vm.getColumnStyle(columns[1]);
    expect(styleFlex).toStrictEqual({ flex: "1" });

    const stylePixels = wrapper.vm.getColumnStyle(columns[0]);
    expect(stylePixels).toStrictEqual({ width: "100px" });
  });

  it("ensures locked previous page", () => {
    const wrapper = shallowMount(DataGrid, {
      propsData: { columns, data, page, pageCount }
    });

    wrapper.vm.onPrev();
    expect(wrapper.emitted().onPrev).toBeFalsy();
  });

  it("ensures previous page", () => {
    page = 2;

    const wrapper = shallowMount(DataGrid, {
      propsData: { columns, data, page, pageCount }
    });

    wrapper.vm.onPrev();
    expect(wrapper.emitted().onPrev).toBeTruthy();
  });

  it("ensures next page", () => {
    const wrapper = shallowMount(DataGrid, {
      propsData: { columns, data, page, pageCount }
    });

    wrapper.vm.onNext();
    expect(wrapper.emitted().onNext).toBeTruthy();
  });

  it("ensures locked next page", () => {
    page = 5;

    const wrapper = shallowMount(DataGrid, {
      propsData: { columns, data, page, pageCount }
    });

    wrapper.vm.onNext();
    expect(wrapper.emitted().onNext).toBeFalsy();
  });

  it("ensures line click", () => {
    const wrapper = shallowMount(DataGrid, {
      propsData: { columns, data, page, pageCount }
    });

    const row = {
      id: "abc-123",
      name: "Blastoise",
      image: "img",
      types: ["Water"]
    };
    wrapper.vm.onClickLine(row);
    expect(wrapper.emitted()["onClickLine"]).toBeTruthy();
    expect(wrapper.emitted()["onClickLine"].length).toBe(1);
    expect(wrapper.emitted()["onClickLine"][0]).toStrictEqual([row]);
  });
});

describe("Home.vue", () => {
  let state, actions, store;
  const mockRoute = {};
  const mockRouter = {
    push: jest.fn()
  };

  beforeEach(() => {
    state = {
      data: [],
      page: 1,
      pages: [],
      carouselData: []
    };

    actions = {
      GET_ALL: jest.fn(),
      NEXT_PAGE: jest.fn(),
      PREV_PAGE: jest.fn()
    };

    store = new Vuex.Store({
      state,
      actions
    });
  });

  it("ensures data fetch", () => {
    shallowMount(Home, {
      store,
      localVue,
      mocks: {
        $i18n: { t: str => str }
      }
    });
    expect(actions[GET_ALL]).toHaveBeenCalled();
  });

  it("ensures next page", () => {
    const wrapper = shallowMount(Home, {
      store,
      localVue,
      mocks: {
        $i18n: { t: str => str }
      }
    });

    wrapper.vm.nextPage();
    expect(actions[NEXT_PAGE]).toHaveBeenCalled();
  });

  it("ensures previous page", () => {
    const wrapper = shallowMount(Home, {
      store,
      localVue,
      mocks: {
        $i18n: { t: str => str }
      }
    });

    wrapper.vm.prevPage();
    expect(actions[PREV_PAGE]).toHaveBeenCalled();
  });

  it("ensures detail navigation", () => {
    const wrapper = shallowMount(Home, {
      store,
      localVue,
      mocks: {
        $route: mockRoute,
        $router: mockRouter,
        $i18n: { t: str => str }
      }
    });

    const id = "abc-123";
    wrapper.vm.onDetail({ id });
    expect(mockRouter.push).toHaveBeenCalledWith({
      name: "Detail",
      params: { id }
    });
  });

  it("ensures page number", () => {
    const wrapper = shallowMount(Home, {
      store,
      localVue,
      mocks: {
        $i18n: { t: str => str }
      }
    });

    expect(wrapper.vm.pageCount).toBe(0);
  });

  it("ensures mobile", () => {
    const wrapper = shallowMount(Home, {
      store,
      localVue,
      mocks: {
        $i18n: { t: str => str }
      }
    });

    wrapper.vm.windowWidth = 500;
    expect(wrapper.vm.isMobile).toBeTruthy();
  });

  it("ensures desktop", () => {
    const wrapper = shallowMount(Home, {
      store,
      localVue,
      mocks: {
        $i18n: { t: str => str }
      }
    });

    wrapper.vm.windowWidth = 1024;
    expect(wrapper.vm.isMobile).toBeFalsy();
  });

  it("ensures mobile carousel", async () => {
    const wrapper = shallowMount(Home, {
      store,
      localVue,
      mocks: {
        $i18n: { t: str => str }
      }
    });

    wrapper.vm.windowWidth = 500;
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".desktop-wrapper").exists()).toBe(false);
    expect(wrapper.find(".carousel").exists()).toBe(true);
  });

  it("ensures grid desktop", async () => {
    const wrapper = shallowMount(Home, {
      store,
      localVue,
      mocks: {
        $i18n: { t: str => str }
      }
    });

    wrapper.vm.windowWidth = 1024;
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".desktop-wrapper").exists()).toBe(true);
    expect(wrapper.find(".carousel").exists()).toBe(false);
  });

  it("ensures search input", async () => {
    const wrapper = shallowMount(Home, {
      store,
      localVue,
      mocks: {
        $i18n: { t: str => str }
      }
    });

    expect(wrapper.find(".search").exists()).toBe(true);
  });
});

describe("Detail.vue", () => {
  let state, actions, store;
  const mockRoute = {
    params: {
      id: "abc-123"
    }
  };
  const mockRouter = {
    push: jest.fn()
  };
  const card = {
    id: "abc-123",
    name: "Alakazam",
    types: ["Psychic"],
    resistances: [{ type: "Fighting", value: "0.5x" }],
    weaknesses: [{ type: "Ghost", value: "2x" }],
    attacks: [{ name: "Telekinesis" }]
  };
  const bgColors = {
    Psychic: "rgba(112, 111, 211, 0.2)"
  };

  beforeEach(() => {
    state = {
      detailData: card
    };

    actions = {
      DETAIL: jest.fn()
    };

    store = new Vuex.Store({
      state,
      actions
    });
  });

  it("ensures data fetch", () => {
    shallowMount(Detail, {
      store,
      localVue,
      mocks: {
        bgColors,
        $route: mockRoute,
        $router: mockRouter,
        $t: str => str
      }
    });

    expect(actions[DETAIL]).toHaveBeenCalled();
  });

  it("ensures attack modal open", () => {
    const wrapper = shallowMount(Detail, {
      store,
      localVue,
      mocks: {
        bgColors,
        $route: mockRoute,
        $router: mockRouter,
        $t: str => str
      }
    });

    wrapper.vm.openAttackModal(card.attacks[0]);
    expect(wrapper.vm.attack).toStrictEqual(card.attacks[0]);
    expect(wrapper.vm.modalVisible).toBe(true);
  });

  it("ensures attack modal close", () => {
    const wrapper = shallowMount(Detail, {
      store,
      localVue,
      mocks: {
        bgColors,
        $route: mockRoute,
        $router: mockRouter,
        $t: str => str
      }
    });

    wrapper.vm.onCloseModal();
    expect(wrapper.vm.modalVisible).toBe(false);
  });

  it("ensures types", () => {
    const wrapper = shallowMount(Detail, {
      store,
      localVue,
      mocks: {
        bgColors,
        $route: mockRoute,
        $router: mockRouter,
        $t: str => str
      }
    });

    expect(wrapper.vm.types).toBe("Psychic");
  });

  it("ensures resistances", () => {
    const wrapper = shallowMount(Detail, {
      store,
      localVue,
      mocks: {
        bgColors,
        $route: mockRoute,
        $router: mockRouter,
        $t: str => str
      }
    });

    expect(wrapper.vm.resistances).toBe("Fighting (0.5x)");
  });

  it("ensures weaknesses", () => {
    const wrapper = shallowMount(Detail, {
      store,
      localVue,
      mocks: {
        bgColors,
        $route: mockRoute,
        $router: mockRouter,
        $t: str => str
      }
    });

    expect(wrapper.vm.weaknesses).toBe("Ghost (2x)");
  });

  it("ensures background color", () => {
    const wrapper = shallowMount(Detail, {
      store,
      localVue,
      mocks: {
        bgColors,
        $route: mockRoute,
        $router: mockRouter,
        $t: str => str
      }
    });

    expect(wrapper.vm.bgColor).toBe(bgColors.Psychic);
  });
});
