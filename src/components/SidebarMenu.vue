<script setup lang="ts">
import { useCocktailStore } from "../stores/cocktailStore";
import { useRoute } from "vue-router";

const { cocktails } = useCocktailStore();
const route = useRoute();
const isActive = (code: string) => {
  return (
    route.params.cocktail_code === code ||
    (!route.params.cocktail_code && cocktails[0].code === code)
  );
};
</script>

<template>
  <nav class="sidebar">
    <ul class="sidebar__list">
      <li
        v-for="cocktail in cocktails"
        :key="cocktail.code"
        class="sidebar__item"
      >
        <router-link
          :to="`/${cocktail.code}`"
          class="sidebar__link"
          :class="{ 'sidebar__link--active': isActive(cocktail.code) }"
        >
          {{ cocktail.code }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
@import "../assets/styles/components/_sidebar.scss";
</style>
