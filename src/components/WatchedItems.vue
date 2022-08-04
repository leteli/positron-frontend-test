<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";

const slide = ref(1);
const slidesCount = computed(() => store.getters.getSlidesCount);

const store = useStore();
const items = computed(() => {
  const result = store.getters.getSlideItems(slide.value);
  console.log(result);
  return result;
});

function slideBackward() {
  if (slide.value === 1) {
    slide.value = slidesCount.value;
    return;
  }
  slide.value--;
}

function slideForward() {
  if (slide.value === slidesCount.value) {
    slide.value = 1;
    return;
  }
  slide.value++;
}
</script>

<template>
  <div class="watched-items">
    <div class="watched-items__header">
      <h2 class="watched-items__title">Просмотренные товары</h2>
      <div class="slider">
        <span @click="slideBackward">
          <svg
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="25"
              cy="25"
              r="25"
              transform="rotate(-180 25 25)"
              fill="#90A2B5"
            />
            <image
              x="18"
              y="15"
              width="10"
              height="20"
              href="src/assets/Vector 1.svg"
            />
          </svg>
        </span>
        <span>
          <span class="slider__current">{{ slide }}</span>
          <span class="slider__count">
            &nbsp;&nbsp;/&nbsp;&nbsp;{{ slidesCount }}</span
          >
        </span>
        <span @click="slideForward">
          <svg
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="25"
              cy="25"
              r="25"
              transform="rotate(-180 25 25)"
              fill="#90A2B5"
            />
            <image
              x="22"
              y="15"
              width="10"
              height="20"
              href="src/assets/Vector 2.svg"
            />
          </svg>
        </span>
      </div>
    </div>
    <div class="watched-items__body">
      <div
        :key="item.id"
        v-for="item in items"
        class="watched-item watched-items__item"
      >
        <div>
          <img :src="item.image" alt="Фото товара" />
          <h3 class="watched-item__title">{{ item.name }}</h3>
          <p class="watched-item__info">{{ item.description }}</p>
        </div>
        <div>
          <span class="watched-item__range-rub">{{ item.rubRange }}</span>
          <br />
          <span class="watched-item__range-eur">{{ item.eurRange }}</span>
          <button
            class="watched-item__button watched-item__button_theme_primary"
          >
            Подробнее
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.watched-items__header {
  display: flex;
  justify-content: space-between;
}
.watched-items__title {
  font-size: 30px;
  font-weight: 600;
}

.slider {
  display: flex;
  align-items: center;
  gap: 20px;
}

.slider__count {
  font-size: 18px;
  color: var(--gray);
}

.slider__current {
  font-size: 24px;
  color: var(--black);
}

.watched-items__body {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
}

.watched-items__item {
  padding: 25px;
}

.watched-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 5px;
  background-color: var(--light);
}

.watched-item__title,
.watched-item__range-rub {
  margin: 0;
  font-size: 22px;
  font-weight: 600;
}

.watched-item__info {
  margin-top: 10px;
  margin-bottom: 40px;
}

.watched-item__range-eur {
  color: var(--gray);
}

.watched-item__button {
  margin-top: 20px;
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: 100%;
  border-radius: 4px;
  text-align: center;
}

.watched-item__button_theme_primary {
  border: none;
  color: var(--white);
  background-color: var(--blue);
}

@media (max-width: 1200px) {
  .watched-items__body {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    row-gap: 20px;
  }
}
</style>
