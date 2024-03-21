<template>
  <a-layout class="layout">
    <a-layout-header style="background-color: transparent"></a-layout-header>
    <a-layout-content style="padding: 0 50px; width: 100%; max-width: 800px; margin: auto">
      <RecordGetForm @submit="handleGetSubmit" />
      <a-divider />
      <RecordMatchForm @submit="handleMatchSubmit" />
      <a-card>
        <component :is="Component" :error="errorMessage" />
      </a-card>
    </a-layout-content>
    <a-layout-footer style="text-align: center"> Тестовое задание для ADS Soft </a-layout-footer>
  </a-layout>
</template>

<script lang="ts" setup>
import RecordMatchForm from './components/RecordMatchForm.vue'
import RecordGetForm from './components/RecordGetForm.vue'
import EmptyData from './components/EmptyData.vue'
import LoadingData from './components/LoadingData.vue'
import LoadingError from './components/LoadingError.vue'
import { useApi } from './composables/useApi'
import type { RecordModel } from './types'
import { match, getRecord } from './api/api'
import { computed, h, ref, type Ref } from 'vue'

const { request, result, isLoading, error } = useApi<RecordModel[]>(match)
const {
  request: request2,
  result: result2,
  isLoading: isLoading2,
  error: error2,
} = useApi<RecordModel>(getRecord)

const activeRequest = ref<'match' | 'get'>()

const errorMessage = computed(() =>
  activeRequest.value === 'match'
    ? error.value && error.value.message
    : error2.value && error2.value.message,
)

const handleMatchSubmit = (data: Record<string, string>) => {
  activeRequest.value = 'match'
  request({ data })
}
const handleGetSubmit = (id: number) => {
  activeRequest.value = 'get'
  request2(id)
}

const getComponent = ({
  error,
  isLoading,
  result,
}: {
  error: Ref
  isLoading: Ref
  result: Ref
}) => {
  if (error.value) {
    return LoadingError
  }
  if (isLoading.value) {
    return LoadingData
  }
  if (!result.value || (Array.isArray(result.value) && !result.value.length)) {
    return EmptyData
  }

  return () => h('pre', JSON.stringify(result.value, undefined, 4))
}

const Component = computed(() => {
  switch (activeRequest.value) {
    case 'match':
      return getComponent({ error, result, isLoading })

    default:
    case 'get':
      return getComponent({ error: error2, result: result2, isLoading: isLoading2 })
  }
})
</script>

<style scoped></style>
