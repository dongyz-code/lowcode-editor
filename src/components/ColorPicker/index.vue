<template>
  <div class="color-picker-wrapper">
    <div class="native-color-container">
      <input type="color" :value="props.value" @input="onChange" />
    </div>
    <ul class="picked-color-list">
      <li v-for="(color, i) of props.colors" :key="i" :class="`item-${i}`" @click="onClick(color)">
        <div
          class="color-item"
          v-if="color.startsWith('#')"
          :style="{
            backgroundColor: color,
          }"
        ></div>
        <div v-else class="color-item transparent"></div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
export default { name: 'color-picker' }
</script>

<script lang="ts" setup>
import { PropType, onMounted } from 'vue'
import { ChangeEvent } from 'ant-design-vue/lib/_util/EventInterface'

const props = defineProps({
  value: {
    type: String,
    require: true,
  },
  colors: {
    type: Array as PropType<string[]>,
    default: () => [
      '#ffffff',
      '#f5222d',
      '#fa541c',
      '#fadb14',
      '#52c41a',
      '#1890ff',
      '#722ed1',
      '#8c8c8c',
      '#000000',
      '',
    ],
  },
})
const emits = defineEmits(['change'])

onMounted(() => {
  console.log(props.value)
})

const onChange = (e: ChangeEvent) => {
  const val = e?.target?.value
  if (!val) return
  emits('change', val)
}
const onClick = (val: string) => {
  if (!val) {
    emits('change', 'transparent')
    return
  }
  emits('change', val)
}
</script>

<style lang="less" scoped>
.color-picker-wrapper {
  display: flex;
}
.native-color-container {
  width: 40%;
}
.native-color-container input[type='color'] {
  width: 100%;
  cursor: pointer;
  height: 50px;
  border: 0;
  padding: 0;
  background-color: transparent;
}
.picked-color-list {
  padding: 0 0 0 5px;
  margin: 0;
  width: 60%;
  display: flex;
  list-style-type: none;
  flex-wrap: wrap;
  justify-content: space-between;
}
.picked-color-list li {
  flex: 1;
  width: 20%;
  min-width: 20%;
  max-width: 20%;
}
.color-item {
  padding: 3px;
  width: 20px;
  height: 20px;
  border-radius: 3px;
  margin-right: 5px;
  cursor: pointer;
  border: 1px solid #ccc;
}
.transparent {
  background: url('~@/assets/editor/transparent.png') no-repeat;
}
</style>
