<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import formatPrice from "../formatPrice.js";
const store = useStore();
const items = computed(() => store.state.cart.selectedItems);

function getTotalPriceByItem(price, count) {
  const total = Number(price.split(" ").join("")) * count;
  return formatPrice(total);
}

function increment(id) {
  store.commit("increment", id);
}

function decrement(id) {
  store.commit("decrement", id);
}

function remove(id) {
  store.commit("removeItemById", id);
}
</script>

<template>
  <div class="selected-items">
    <div
      v-for="(item, index) in items"
      :key="item.id"
      :class="{ 'selected-items__first-item': index === 0 }"
      class="selected-item"
    >
      <img
        class="selected-item__image"
        :src="item.image"
        alt="Фото выбранного товара"
      />
      <div>
        <h2 class="selected-item__title">{{ item.name }}</h2>
        <p class="selected-item__info">{{ item.description }}</p>
        <p class="selected-item__number">Артикул: {{ item.number }}</p>
      </div>
      <div class="selected-item__counter-wrapper">
        <div class="counter">
          <button @click="decrement(item.id)" class="counter__minus">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-dash"
              viewBox="0 0 16 16"
            >
              <path
                d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"
              />
            </svg>
          </button>
          <span class="counter__count">{{ item.count }}</span>
          <button @click="increment(item.id)" class="counter__plus">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-plus"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
              />
            </svg>
          </button>
        </div>
        <span class="counter__price">{{ item.price }} ₽/шт.</span>
      </div>
      <span class="selected-item__price">
        {{ getTotalPriceByItem(item.price, item.count) }} ₽
      </span>
      <span @click="remove(item.id)" class="selected-item__close-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="16"
          height="16"
          viewBox="0 0 50 50"
        >
          <path
            d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"
          ></path>
        </svg>
      </span>
    </div>
  </div>
</template>

<style scoped>
.selected-items {
  width: 100%;
  max-width: 800px;
}

.selected-item {
  position: relative;

  height: 145px;
  display: flex;
  align-items: center;
  border-top: 1px solid var(--light-gray);
}

.selected-items__first-item {
  border: none;
}

.selected-item__image {
  display: inline-block;
  margin-left: 1rem;
  margin-right: 2rem;
}
.selected-item__title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}
.selected-item__info {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  font-size: 12px;
  color: var(--dark-gray);
}

.selected-item__number {
  margin: 0;
  font-size: 14px;
  color: var(--gray);
}

.selected-item__counter-wrapper {
  position: relative;
  margin-right: 80px;
  margin-left: 80px;
}

.counter {
  width: 100px;
  height: 32px;

  display: flex;
  align-items: center;
  align-self: baseline;
  gap: 2px;
}

.selected-item__close-icon {
  position: absolute;
  top: 1.5rem;
  right: 0.5rem;
  fill: var(--black-soft);
}

.selected-item__close-icon svg {
  fill: var(--black-soft);
}

.counter__minus,
.counter__count,
.counter__plus {
  flex: 1 1 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  height: 100%;
  background-color: var(--light);
}

.counter__minus {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.counter__plus {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.counter__minus svg,
.counter__plus svg {
  fill: var(--icons-gray);
}

.counter__price {
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;

  width: max-content;
  margin-left: auto;
  margin-right: auto;

  font-size: 12px;
}

.selected-item__price {
  margin-right: 3.5rem;
  font-size: 18px;
  font-weight: 500;
  white-space: nowrap;
}
</style>
