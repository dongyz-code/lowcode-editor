<template>
  <div class="propss-table">
    <div v-for="(value, index) in finalProps" :key="index" class="prop-item">
      <span class="label">{{ value?.label }}</span>
      <div class="prop-content">
        <component
          v-if="value?.value || Number(value?.value) === 0"
          :is="antMap[value.component]"
          v-bind="value.defaultProps"
          v-on="value.events"
          :[value.valueProps]="value.value"
        >
          <template v-if="value.options && value.subComponent">
            <component
              v-for="(option, subIndex) in value.options"
              :key="`${index}_${subIndex}`"
              :is="antMap[value.subComponent]"
              :value="option.value"
            >
              <RenderVnode :vNode="option.text"></RenderVnode>
            </component>
          </template>
        </component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PropsTable',
}
</script>
<script setup lang="ts">
import { computed, PropType } from 'vue'
import { reduce } from 'lodash-es'
import { mapPropsToForms, PropsToForm } from '@/config/propsToForm'
import { TextComponentProps } from '@/config/defaultProps'
import RenderVnode from '../RenderVnode'
import antMap from '@/plugins/antdMap'

interface FormProps extends PropsToForm {
  valueProps: string
  value: string
  eventName: string
  events: { [key: string]: (e: any) => void }
}

const props = defineProps({
  props: Object as PropType<Partial<TextComponentProps>>,
})

const emits = defineEmits(['change'])

const finalProps = computed(() => {
  return reduce(
    props.props,
    (result, value, key) => {
      const newkey = key as keyof TextComponentProps
      const item = mapPropsToForms[newkey]
      if (!item) return result

      const { valueProps = 'value', eventName = 'change', initaTransform, afterTransform } = item

      const handleChange = (e: Event) => {
        emits('change', { key, value: afterTransform ? afterTransform(e) : e })
      }

      const newItem = {
        ...item,
        value: initaTransform ? initaTransform(value) : value,
        eventName,
        events: { [eventName]: handleChange },
        valueProps,
      }
      result[newkey] = newItem
      return result
    },
    {} as { [P in keyof TextComponentProps]: FormProps }
  )
})
</script>

<style lang="less" scoped>
.prop-item {
  display: flex;
  align-items: center;
  &:not(&:last-child) {
    margin-bottom: 10px;
  }
  .label {
    width: 28%;
  }
  .prop-content {
    width: 70%;
  }
}
</style>
