<script setup lang="ts">
import SidebarMenu from "./components/SidebarMenu.vue";
</script>

<template>
  <div class="container">
    <SidebarMenu />
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
@import "../src/assets/styles/components/_sidebar.scss";
@import "../src/assets/styles/components/_content.scss";
@import "../src/assets/styles/_container.scss";
</style>
