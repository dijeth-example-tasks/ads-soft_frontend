<template>
  <a-empty :image="simpleImage" description="Loading error" />
  <p style="text-align: center">{{ error }}</p>
</template>

<script lang="ts" setup>
import { Empty } from 'ant-design-vue'

defineProps<{ error: string }>()

const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE
</script>
