import { Input, Slider, InputNumber, Select } from 'ant-design-vue'
import RadioGroup from 'ant-design-vue/lib/radio/Group'
import RadioButton from 'ant-design-vue/lib/radio/RadioButton'
import SelectOption from 'ant-design-vue/lib/select'
import 'ant-design-vue/lib/radio/style/index.less'
import ColorPicker from '@/components/ColorPicker/index.vue'

import { Component } from 'vue'

type antMap = {
  [key: string]: Component
}

const antMap: antMap = {
  'a-input': Input,
  'a-input-number': InputNumber,
  'a-slider': Slider,
  'a-radio-group': RadioGroup,
  'a-radio-button': RadioButton,
  'a-select': Select,
  'a-select-option': SelectOption,
  'color-picker': ColorPicker,
}
export default antMap
