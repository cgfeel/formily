import { createForm } from '@formily/core';
import { attach } from './shared';

// 测试创建 ObjectField 对象
test('create object field', () => {
    // 创建一个 form 对象并挂载
    const form = attach(createForm())

    // 创建一个 objectField 对象并挂载
    const object = attach(
        form.createObjectField({
            name: 'object',
        })
    )

    // 对象的值等于 {}
    expect(object.value).toEqual({})

    // 检查挂载的 objectField 是否有这 3 个属性
    expect(object.addProperty).toBeDefined()
    expect(object.removeProperty).toBeDefined()
    expect(object.existProperty).toBeDefined()
})

// 测试 ObjectField 对象的方法
test('create object field methods', () => {
    const form = attach(createForm())
    const object = attach(
        form.createObjectField({
            name: 'object',
            value: {},
        })
    )

    // 对象的值等于 {}
    expect(object.value).toEqual({})

    // 给对象添加属性，并触发 onInput
    object.addProperty('aaa', 123)
    expect(object.value).toEqual({ aaa: 123 })

    // 移除对象属性，并触发 onInput
    object.removeProperty('aaa')
    expect(object.value).toEqual({})

    // 现在测试对象的属性是否为空
    expect(object.existProperty('aaa')).toBeFalsy()
})