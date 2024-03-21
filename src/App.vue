<template>
  <a-layout class="layout">
    <a-layout-header style="background-color: transparent"></a-layout-header>
    <a-layout-content style="padding: 0 50px; width: 100%; max-width: 800px; margin: auto">
      <RecordForm />
    </a-layout-content>
    <a-layout-footer style="text-align: center"> Тестовое задание для ADS Soft </a-layout-footer>
  </a-layout>
</template>

<script lang="ts" setup>
import RecordForm from './components/RecordForm.vue'
</script>

<style scoped></style>
