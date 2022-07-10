import { mount, shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld/index.vue'
import Child from '@/components/HelloWorld/Child.vue'
describe('Test Hello World Component', () => {
  it('test mount', () => {
    const wrapper = mount(HelloWorld)
    const title = wrapper.get('.child_title')
    console.log('title', title.text())
    const component = wrapper.getComponent(Child)
    console.log('component', component.props())
  })

  it('test shallowMount', () => {
    const wrapper = shallowMount(HelloWorld)
    const title = wrapper.find('.child_title') // 使用find不报错
    console.log('title', title)
  })

  it('should update the count when clicking the button', async () => {
    const wrapper = shallowMount(HelloWorld, {
      props: {
        msg: 'Hello World msg',
      },
    })
    const msg = wrapper.get('.msg').text()
    expect(msg).toBe('Hello World msg')
    const button = wrapper.get('button')
    await button.trigger('click')
    expect(button.text()).toBe('2')
  })

  it.only('add a value to list', async () => {
    const testValue = 'Hello Every Day'
    const wrapper = shallowMount(HelloWorld)
    const input = wrapper.get<HTMLFormElement>('#add-input')
    await input.setValue(testValue)
    expect(input.element.value).toBe(testValue)

    // 添加一个item 并判断ul中有一个li
    const button = wrapper.get('#add-btn')
    await button.trigger('click')
    await button.trigger('click')
    const allItems = wrapper.findAll('li')
    expect(allItems).toHaveLength(1) //
    expect(allItems[0].text()).toBe(testValue)

    //  判断组件emits
    expect(wrapper.emitted()).toHaveProperty('send')
    const events = wrapper.emitted('send') as unknown[]
    // console.log('events', events) // [ [ 1234 ] ]
    // console.log('emitted', wrapper.emitted()) // { send: [ [ 1234 ] ] }
    expect(events).not.toBeUndefined()
    expect(events[0]).toEqual([testValue])
  })
})
