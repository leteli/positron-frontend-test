<script setup>
import { useStore } from "vuex";

const store = useStore();

function check() {
  store.commit("check");
}
</script>

<template>
  <div class="setting">
    <input @change="check" class="setting__checkbox" type="checkbox" />
    <img src="../assets/Utilities.png" alt="Иконка с инструментами" />
    <div class="setting__text">
      <h2 class="setting__title">Установка</h2>
      <p class="setting__info">
        Отметьте, если Вам необходима консультация профессионала по монтажу
        выбранных товаров.
      </p>
    </div>
  </div>
</template>

<style scoped>
.setting {
  display: flex;
  align-items: center;
  gap: 20px;
  border-radius: 5px;
  background-color: var(--light);
}
.setting__checkbox {
  margin-left: 25px;
}

.setting__text {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.setting__title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.setting__info {
  margin: 0;
  color: var(--gray);
}
</style>
