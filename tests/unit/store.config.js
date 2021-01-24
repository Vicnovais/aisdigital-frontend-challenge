import mutations from "@/store/mutations";
import actions from "@/store/actions";

export default {
  state: {
    loading: false,
    page: 1,
    detailData: {},
    pages: [],
    data: [],
    carouselData: []
  },

  mutations,
  actions
};
