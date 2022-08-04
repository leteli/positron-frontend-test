<script setup>
import { useStore } from "vuex";

import CartContent from "./CartContent.vue";
import CartResult from "./CartResult.vue";
import SettingCheckbox from "./SettingCheckbox.vue";
import WatchedItems from "./WatchedItems.vue";

const store = useStore();

function clear() {
  store.commit("clearCart");
}
</script>

<template>
  <main class="cart">
    <div class="cart__content">
      <div class="menu-line">
        <span><a href="#">Главная</a></span>
        <span class="menu-line__arrow">
          <svg
            width="5"
            height="8"
            viewBox="0 0 5 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path opacity="0.8" d="M0 8V0L5 4L0 8Z" fill="#33374E" />
          </svg>
        </span>
        <span><a href="#" class="menu-line__cart">Корзина</a></span>
      </div>
      <div class="cart__main-section">
        <div class="cart__header">
          <h1 class="cart__title">Ваша корзина</h1>
          <span class="cart__items-count">4 товара</span>
          <a @click="clear" href="#" class="cart__clear-cart">Очистить корзину</a>
        </div>
        <CartContent class="cart__items" />
        <SettingCheckbox class="cart__setting" />
        <CartResult class="cart__result" />
      </div>
      <WatchedItems />
    </div>
  </main>
</template>

<style scoped>
.cart {
  display: flex;
  justify-content: center;
}
.cart__content {
  max-width: 1320px;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 115px;
}

.menu-line {
  margin-top: 30px;
}

.menu-line__arrow {
  margin-right: 10px;
  margin-left: 10px;
}

.menu-line__cart {
  color: var(--gray);
}

.cart__main-section {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 55px;
  grid-template-rows: repeat(auto-fill, max-content);

  margin-bottom: 95px;
}

.cart__header {
  grid-column: 1 / 9;
  grid-row: 1 / 2;

  max-width: 800px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;

  margin-top: 60px;
  margin-bottom: 35px;
}

.cart__items {
  grid-column: 1 / 9;
  grid-row-start: 2;
}

.cart__setting {
  grid-column: 1 / 9;
}

.cart__result {
  grid-column: 9 / -1;
  grid-row: 2 / 3;
}

.cart__title {
  display: inline;
  margin: auto 0.5em 0 0;
  font-size: 44px;
  line-height: 1;
  font-weight: 600;
}

.cart__items-count {
  font-size: 18px;
  color: var(--gray);
}

.cart__clear-cart {
  margin-left: auto;
  font-size: 14px;
  color: var(--gray);
  text-decoration: underline;
}

@media(max-width: 1200px) {
  .cart__main-section {
    grid-template-columns: repeat(8, 1fr);
  }

  .cart__result {
    grid-column: 1 / 5;
    grid-row: auto;
    margin-top: 2rem;
  }
}
</style>
