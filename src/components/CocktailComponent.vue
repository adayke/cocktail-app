<script setup lang="ts">
import { watch, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCocktailStore } from "../stores/cocktailStore";

const route = useRoute();
const router = useRouter();
const store = useCocktailStore();

const loadCocktailData = (code: string) => {
  store.fetchCocktailData(code);
  store.setCurrentCocktail(code);
};

const currentCocktailData = computed(() => {
  const cocktail = store.getCocktailByCode(store.currentCocktail);
  return cocktail ? cocktail.data : "Loading...";
});

const validCocktailCodes = ["margarita", "mojito", "a1", "kir"];

watch(
  () => route.params.cocktail_code,
  (newCode) => {
    if (typeof newCode === "string") {
      loadCocktailData(newCode);
    } else {
      loadCocktailData(newCode[0]);
    }
  }
);

onMounted(() => {
  const cocktailCode = route.params.cocktail_code;

  if (
    typeof cocktailCode === "string" &&
    validCocktailCodes.includes(cocktailCode)
  ) {
    loadCocktailData(cocktailCode);
  } else {
    router.push({ name: "NotFound" });
  }
});
</script>

<template>
  <div class="content">
    <h1 class="content__title">Cocktail Component</h1>
    <p class="content__description">{{ currentCocktailData }}</p>
  </div>
</template>

<style scoped>
@import "../assets//styles/components/_content.scss";
</style>
