<template>
  <a-form :model="formState" name="basic" autocomplete="off" @finish="onFinish">
    <a-form-item v-for="(_, i) of formState.pairs" :key="i" style="display: flex">
      <a-row :gutter="24" justify="center">
        <a-col>
          <a-form-item label="key" :name="`key${i}`">
            <a-input v-model:value="formState.pairs[i].key" />
          </a-form-item>
        </a-col>
        <a-col>
          <a-form-item label="value" :name="`value${i}`">
            <a-input v-model:value="formState.pairs[i].value" />
          </a-form-item>
        </a-col>
        <a-col>
          <a-form-item>
            <a-button @click="removePair(i)">-</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form-item>

    <a-row justify="center">
      <a-form-item>
        <a-button @click="addPair">+</a-button>
      </a-form-item>
    </a-row>

    <a-row justify="center">
      <a-form-item>
        <a-button type="primary" html-type="submit">Match</a-button>
      </a-form-item>
    </a-row>
  </a-form>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'

interface FormState {
  pairs: { key: string; value: string }[]
}

const emit = defineEmits(['submit'])

const formState = reactive<FormState>({
  pairs: [{ key: 'white', value: 'black' }],
})

const addPair = () => {
  formState.pairs.push({ key: '', value: '' })
}

const removePair = (index: number) => {
  formState.pairs = formState.pairs.filter((_, i) => i !== index)
}

const onFinish = () => {
  const data = formState.pairs.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {})
  emit('submit', data)
}
</script>
