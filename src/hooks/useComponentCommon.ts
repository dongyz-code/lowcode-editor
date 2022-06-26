import { computed, ExtractPropTypes } from 'vue'
import { omit } from 'lodash-es'
import { TextComponentProps } from '@/config/defaultProps'
import { winOpen } from '@/utils'

const useComponentCommon = (
  props: Readonly<ExtractPropTypes<TextComponentProps>>,
  omits: string[]
) => {
  const styleProps = computed(() => omit(props, omits))
  const handleClick = () => {
    if (props.actionType === 'url' && props.url) {
      winOpen(props.url)
    }
  }
  return {
    styleProps,
    handleClick,
  }
}

export default useComponentCommon
