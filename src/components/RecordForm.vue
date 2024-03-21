<template>
  <a-form
    :model="formState"
    name="basic"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      v-for="({ key, value }, i) of formState.pairs"
      :key="`${key}-${value}`"
      style="display: flex"
    >
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
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-row>
  </a-form>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'

interface FormState {
  pairs: { key: string; value: string }[]
}

const formState = reactive<FormState>({
  pairs: [
    { key: 'deep', value: 'purple' },
    { key: 'red', value: 'pink' }
  ]
})

const addPair = () => {
  formState.pairs.push({ key: '', value: '' })
}

const removePair = (index: number) => {
  formState.pairs = formState.pairs.filter((_, i) => i !== index)
}

const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
</script>
