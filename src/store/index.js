import { createStore } from "vuex";
import { uniqueId } from "lodash";
import axios from "axios";

import formatPrice from "../formatPrice.js";
import { selectedItems, watchedItems } from "./storeDataFixtures.js";

const store = createStore({
  state: {
    cart: {
      selectedItems,
      needsSetting: false,
      watchedItems,
      checkoutStatus: "initial",
    },
  },
  mutations: {
    addItemToCart(state, item) {
      state.cart.selectedItems.push({ ...item, id: uniqueId() });
    },

    increment(state, id) {
      const item = state.cart.selectedItems.find((item) => item.id === id);
      item.count++;
    },

    decrement(state, id) {
      const item = state.cart.selectedItems.find((item) => item.id === id);
      item.count--;
    },

    check(state) {
      const newCheckedValue = state.cart.needsSetting ? false : true;
      state.cart.needsSetting = newCheckedValue;
    },

    removeItemById(state, itemId) {
      const index = state.cart.selectedItems.findIndex(
        (item) => item.id === itemId
      );
      state.cart.selectedItems.splice(index, 1);
    },

    clearCart(state) {
      state.cart.selectedItems = [];
    },

    setCheckoutStatus(state, status) {
      state.cart.checkoutStatus = status;
    },

    addWatchedItem(state, item) {
      state.cart.watchedItems.push({ ...item, id: uniqueId() });
    },
  },
  actions: {
    checkout: async ({ commit, state }) => {
      const items = state.cart.selectedItems;
      console.log(items);
      try {
        await axios.post("/api/checkoutCart", items);
        console.log("6363");
        commit("clearCart");
        commit("setCheckoutStatus", "success");
      } catch (err) {
        console.log(err.message);
        commit("setCheckoutStatus", "failed");
      }
    },
  },
  getters: {
    getTotalPrice: (state) => {
      const totalPrice = state.cart.selectedItems.reduce((acc, { price, count }) => {
          const priceAsNumber = Number(price.split(" ").join(""));
          return acc + priceAsNumber * count;
        }, 0);
      return formatPrice(totalPrice);
    },

    getTotalCount: (state) => {
      return state.cart.selectedItems.reduce((acc, { count }) => {
        return acc + count;
      }, 0);
    },
    getSlideItems: (state) => (slideNumber) => {
      const itemsByPage = 4;
      const result = state.cart.watchedItems.filter((item, index) => {
        console.log(itemsByPage * (slideNumber - 1));
        return (
          itemsByPage * (slideNumber - 1) <= index &&
          index < itemsByPage * slideNumber
        );
      });
      console.log(result);
      return result;
    },
    getSlidesCount: (state) => {
      return Math.ceil(state.cart.watchedItems.length / 4);
    },
  },
});

export default store;
