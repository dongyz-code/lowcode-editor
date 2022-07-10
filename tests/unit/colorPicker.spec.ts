import { mount, VueWrapper } from '@vue/test-utils'
import ColorPicker from '@/components/ColorPicker/index.vue'
import rgbHex from 'rgb-hex'
const defaultColors = [
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
]

describe('ColorPicker.vue', () => {
  let wrapper: VueWrapper<any>
  beforeAll(() => {
    wrapper = mount(ColorPicker, {
      props: {
        value: '#ffffff',
      },
    })
  })
  it('should render the correct interface', () => {
    // 测试左侧是否为 input，类型和值是否正确
    const input = wrapper.get('input').element
    expect(input.type).toBe('color')
    expect('#' + rgbHex(input.value)).toBe('#ffffff')

    // 测试右侧是否有颜色的列表
    expect(wrapper.findAll('.picker-color-list li')).toHaveLength(defaultColors.length)
    // 检查一个元素的 css backgroundColor属性是否相等对应的颜色
    const firstItem = wrapper.get('.picker-color-list li:first-child > div').element as HTMLElement
    expect(firstItem.style.backgroundColor).toBe(defaultColors[0])
    // 测试最后一个元素是否有特殊的类名
    const lastItem = wrapper.get('.picker-color-list li:last-child > div').element as HTMLElement
    expect(lastItem.classList).toContain('transparent')
  })

  it('should send the correct event when change input', async () => {
    // 测试 input 修改以后，是否发送对应的事件和对应的值
    const testColor = '#722ed1'
    const input = wrapper.get('input')
    await input.setValue(testColor)

    const inputEle = input.element
    expect(inputEle.value).toBe('#722ed1')
    const emitteds = wrapper.emitted('change') as any[]
    expect(emitteds[0]).toEqual([testColor])
  })
  it('should send the correct event when clicking the color list', async () => {
    // 测试点击右侧颜色列表以后，是否发送对应的值
    const firstItem = wrapper.get('li:first-child div')
    firstItem.trigger('click')
    const events = wrapper.emitted('change') as any[]
    expect(events[1]).toEqual([defaultColors[0]])
  })
})
