import { TextComponentProps } from './defaultProps'
export interface PropsToForm {
  label: string
  component: string
  value?: string
  defaultProps?: { [key: string]: any }
}

export type PropsToForms =  {
  [P in keyof TextComponentProps]?: PropsToForm 
}

export const mapPropsToForms: PropsToForms = {
  text: {
    label: '文本',
    component: 'a-input'
  },
  fontSize: {
     label: '字号',
    component: 'a-input-number'
  },
  lineHeight: {
     label: '行高',
    component: 'a-slider',
    defaultProps: {
      min: 0,
      max: 3,
      step: 0.1
    }
  }
}