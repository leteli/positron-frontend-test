<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const totalPrice = computed(() => store.getters.getTotalPrice);
const totalCount = computed(() => store.getters.getTotalCount);
const needsSetting = computed(() => store.state.cart.needsSetting);
</script>

<template>
  <div class="result-section">
    <h2 class="result-section__title">Итого</h2>
    <div class="result-section__body">
      <div class="result-line">
        <span class="result-line__key">Сумма заказа</span>
        <span>{{ totalPrice }} ₽</span>
      </div>
      <div class="result-line">
        <span class="result-line__key">Количество</span>
        <span>{{ totalCount }} шт</span>
      </div>
      <div class="result-line">
        <span class="result-line__key">Установка</span>
        <span>{{ needsSetting ? "Да" : "Нет" }}</span>
      </div>
    </div>
    <div class="result-line result-section__total">
      <span class="result-line__total-key">Стоимость товаров</span>
      <span class="result-line__total-value">{{ totalPrice }} ₽</span>
    </div>
    <button class="result-section__button result-section__button_theme_primary">Оформить заказ</button>
    <button
      class="result-section__button result-section__button_theme_outline-primary"
    >
      Купить в 1 клик
    </button>
  </div>
</template>

<style scoped>
.result-section {
  padding: 35px 30px;
  border-radius: 5px;
  background-color: var(--light);
}
.result-section__title {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.result-section__body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.result-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.result-line__key {
  font-weight: 500;
}

.result-section__total {
  border-top: 1px solid var(--line-gray);
  padding-top: 0.8rem;
  padding-bottom: 2rem;
}

.result-line__total-key {
  font-size: 16px;
  font-weight: 500;
}

.result-line__total-value {
  font-size: 24px;
  font-weight: 700;
}

.result-section__button {
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: 100%;
  border-radius: 4px;
  text-align: center;
  font-size: 16px;
}

.result-section__button_theme_primary {
  border: none;
  color: var(--white);
  background-color: var(--blue);
}

.result-section__button_theme_outline-primary {
  margin-top: 12px;
  border: 1px solid var(--blue);
  color: var(--blue);
  background-color: var(--white);
}
</style>
