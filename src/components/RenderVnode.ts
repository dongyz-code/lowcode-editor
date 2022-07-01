import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    vNode: {
      type: Object,
      require: true,
    },
  },

  render() {
    return this.vNode
  },
})
