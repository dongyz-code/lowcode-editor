import { Input } from 'ant-design-vue'
import { InputNumber } from 'ant-design-vue'
import { Slider } from 'ant-design-vue'
import { Component } from 'vue'

type antMap = {
  [key: string]: Component
}

const antMap: antMap = {
  'a-input': Input,
  'a-input-number': InputNumber,
  'a-slider': Slider,
}
export default antMap
