import { TextComponentProps } from './defaultProps'
export interface PropsToForm {
  label: string
  component: string
  defaultProps?: { [key: string]: any }
  subComponent?: string
  options?: { [key: string]: any }[]
  initaTransform?: (v: any) => any
  afterTransform?: (v: any) => any
  valueProps?: string
  eventName?: string
}

export type PropsToForms = {
  [P in keyof TextComponentProps]?: PropsToForm
}

export const mapPropsToForms: PropsToForms = {
  text: {
    label: '文本',
    component: 'a-input',
    afterTransform: (e) => e.target.value,
  },
  fontSize: {
    label: '字号',
    component: 'a-input-number',
    initaTransform: (value) => parseFloat(value),
    afterTransform: (value) => value + 'px',
  },
  lineHeight: {
    label: '行高',
    component: 'a-slider',
    initaTransform: (value) => parseFloat(value),
    afterTransform: (value) => String(value),
    defaultProps: {
      min: 0.1,
      max: 3,
      step: 0.1,
    },
  },
  textAlign: {
    label: '对齐',
    component: 'a-radio-group',
    subComponent: 'a-radio-button',
    afterTransform: (e) => e.target.value,
    options: [
      { text: '左', value: 'left' },
      { text: '中', value: 'center' },
      { text: '右', value: 'right' },
    ],
  },
  fontFamily: {
    label: '字体',
    component: 'a-select',
    defaultProps: {
      options: [
        { label: '宋体', value: '"SimSun","STSong"' },
        { label: '黑体', value: '"SimHei","STHeiti"' },
        { label: '楷体', value: '"KaiTi","STKaiti"' },
        { label: '仿宋', value: '"FangSong","STFangsong"' },
      ],
    },
  },
}
