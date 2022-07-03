<template>
  <div class="msg">{{ props.msg }}</div>
  <button @click="handleClick">{{ count }}</button>

  <input id="add-input" type="text" v-model="addValue" />
  <button id="add-btn" @click="handleAdd"></button>

  <ul>
    <li v-for="(item, i) of list" :key="i">
      {{ item }}
    </li>
  </ul>

  <Child title="this a children" />
</template>

<script lang="ts">
export default {
  name: 'HelloWorld',
}
</script>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import Child from './Child.vue'

const props = defineProps({
  msg: {
    require: true,
    type: String,
  },
})
const emits = defineEmits(['send'])
const count = ref(1)
const addValue = ref('')
const list = reactive<string[]>([])
const handleClick = () => {
  count.value++
}
const handleAdd = () => {
  if (!addValue.value) return
  list.push(addValue.value)
  emits('send', addValue.value)
  addValue.value = ''
}
</script>

<style lang="less" scoped></style>
