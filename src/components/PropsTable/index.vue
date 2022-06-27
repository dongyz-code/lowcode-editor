<template>
  <div class="propss-table">
    <div v-for="(value, index) in finalProps" :key="index" class="prop-item">
      <span class="label">{{ value?.label }}</span>
      <div class="prop-content">
        <component v-if="value?.value" :is="antMap[value?.component]" v-bind="value.defaultProps" :value="value?.value">
          <template v-if="value.options && value.subComponent">
            <component
              v-for="(option, subIndex) in value.options"
              :key="`${index}_${subIndex}`"
              :is="antMap[value.subComponent]"
              :value="option.value"
            >
              {{ option.text }}
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
import { mapPropsToForms, PropsToForms } from '@/config/propsToForm'
import { TextComponentProps } from '@/config/defaultProps'
import antMap from '@/plugins/antdMap'

const props = defineProps({
  props: Object as PropType<Partial<TextComponentProps>>,
})

const finalProps = computed(() => {
  return reduce(
    props.props,
    (result, value, key) => {
      const newkey = key as keyof TextComponentProps
      const item = mapPropsToForms[newkey]
      if (item) {
        item.value = item.initaTransform ? item.initaTransform(value) : value
        result[newkey] = item
      }
      return result
    },
    {} as PropsToForms
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
