import { createStore } from "vuex";
import { uniqueId } from "lodash";
import formatPrice from "./formatPrice.js";
import axios from "axios";

const store = createStore({
  state: {
    cart: {
      selectedItems: [
        {
          id: 1,
          image: "src/assets/SelectedItem1.png",
          name: "Вытяжное устройство G2H",
          description:
            "12-72/168 м3/ч / гидрорегулируемый расход /  от датчика присутствия",
          number: "G2H1065",
          price: "12 644",
          count: 1,
        },
        {
          id: 2,
          image: "src/assets/SelectedItem2.png",
          name: "Вытяжное устройство BXC",
          description:
            "12-72/168 м3/ч / гидрорегулируемый расход /  от датчика присутствия",
          number: "G2H1065",
          price: "12 644",
          count: 2,
        },
        {
          id: 3,
          image: "src/assets/SelectedItem3.png",
          name: "Вытяжное устройство GHN",
          description:
            "12-72/168 м3/ч / гидрорегулируемый расход /  от датчика присутствия",
          nubmer: "G2H1065",
          price: "12 644",
          count: 1,
        },
      ],
      needsSetting: false,
      watchedItems: [
        {
          id: 1,
          image: "src/assets/WatchedItem1.png",
          name: "BXC",
          description:
            "Вытяжное устройство для механической системы вентиляции",
          rubRange: "6 848 ₽ – 56 584 ₽",
          eurRange: "77.60 € – 643.86 €",
        },
        {
          id: 2,
          image: "src/assets/WatchedItem2.png",
          name: "G2H",
          description: "Многофункциональное вытяжное устройство для естественной и гибридной вентиляции",
          rubRange: "6 848 ₽ – 56 584 ₽",
          eurRange: "77.60 € – 643.86 €",
        },
        {
          id: 3,
          image: "src/assets/WatchedItem3.png",
          name: "GHN",
          description: "Вытяжное устройство с датчиком присутствия",
          rubRange: "6 848 ₽ – 56 584 ₽",
          eurRange: "77.60 € – 643.86 €",
        },
        {
          id: 4,
          image: "src/assets/WatchedItem4.png",
          name: "TDA",
          description: "Вытяжное устройство с датчиком присутствия",
          rubRange: "6 848 ₽ – 56 584 ₽",
          eurRange: "77.60 € – 643.86 €",
        },
        {
          id: 5,
          image: "src/assets/WatchedItem4.png",
          name: "OOO",
          description: "Вытяжное устройство с датчиком присутствия",
          rubRange: "6 848 ₽ – 56 584 ₽",
          eurRange: "77.60 € – 643.86 €",
        },
        {
          id: 6,
          image: "src/assets/WatchedItem4.png",
          name: "TTT",
          description: "Вытяжное устройство с датчиком присутствия",
          rubRange: "6 848 ₽ – 56 584 ₽",
          eurRange: "77.60 € – 643.86 €",
        },
        {
          id: 7,
          image: "src/assets/WatchedItem4.png",
          name: "LLL",
          description: "Вытяжное устройство с датчиком присутствия",
          rubRange: "6 848 ₽ – 56 584 ₽",
          eurRange: "77.60 € – 643.86 €",
        },
        {
          id: 8,
          image: "src/assets/WatchedItem4.png",
          name: "CCC",
          description: "Вытяжное устройство с датчиком присутствия",
          rubRange: "6 848 ₽ – 56 584 ₽",
          eurRange: "77.60 € – 643.86 €",
        },
        {
          id: 9,
          image: "src/assets/WatchedItem4.png",
          name: "BBB",
          description: "Вытяжное устройство с датчиком присутствия",
          rubRange: "6 848 ₽ – 56 584 ₽",
          eurRange: "77.60 € – 643.86 €",
        },
        {
          id: 10,
          image: "src/assets/WatchedItem4.png",
          name: "AAA",
          description: "Вытяжное устройство с датчиком присутствия",
          rubRange: "6 848 ₽ – 56 584 ₽",
          eurRange: "77.60 € – 643.86 €",
        },
      ],
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
