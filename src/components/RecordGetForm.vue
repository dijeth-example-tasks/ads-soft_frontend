<template>
  <a-form :model="formState" autocomplete="off" @finish="onFinish">
    <a-row :gutter="24" justify="center">
      <a-form-item label="id" style="margin-right: 24px">
        <a-input-number v-model:value="formState.id" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">Get</a-button>
      </a-form-item>
    </a-row>
  </a-form>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'

interface FormState {
  id: number
}

const emit = defineEmits(['submit'])

const formState = reactive<FormState>({
  id: 1,
})

const onFinish = () => {
  emit('submit', formState.id)
}
</script>
