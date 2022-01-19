import { Button, Card, Form, Input, InputNumber, Table, Tag } from 'antd'
import React, { useRef, useState } from 'react'

export interface IProduct {
  type?: string
  category?: string
  article?: string
  name: string
  description?: string
  tags?: string[]
  imgs?: string[]
  imgs_big?: string[]
  imgs_small?: string[]
  videos?: string[]
  buy_price: string
  delivery_price: string
  height: number
  length: number
  width: number
  weight: number
  brand?: string
  count?: number
  provider?: string
  address?: string
  user_creator_id?: string
  changed?: Date
  user_changed_id?: string
}

const Products = () => {
  const [tags, setTags] = useState<string[]>([])
  const input_tags_ref = useRef<Input>(null)

  const onFinish = (values: IProduct) => {}
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <div style={{ width: '300px' }}>
        <Card title='Create new category'>
          <Form name='normal_login' className='login-form' onFinish={onFinish}>
            <Form.Item name='type'>
              <Input placeholder='Type' />
            </Form.Item>
            <Form.Item name='category'>
              <Input placeholder='Category' />
            </Form.Item>
            <Form.Item name='article'>
              <Input placeholder='Article' />
            </Form.Item>
            <Form.Item
              name='name'
              rules={[{ required: true, message: 'Please input name!' }]}>
              <Input placeholder='Name' />
            </Form.Item>
            <Form.Item name='description'>
              <Input.TextArea placeholder='Description' />
            </Form.Item>
            <Form.Item>
              <Input
                type='file'
                accept='.png, .jpg, .jpeg'
                name='img'
                // onChange={handlePhoto}
              />
            </Form.Item>
            <Form.Item>
              <label style={{ fontWeight: 'bold' }}>Tags: </label>

              {tags.map(tag => (
                <Tag>{tag}</Tag>
              ))}
            </Form.Item>
            <Form.Item name='tags'>
              <Input
                ref={input_tags_ref}
                placeholder='Comma separated tags'
                type='text'
                onInput={e => {
                  const s = input_tags_ref.current?.input.value
                  if (!s) return
                  setTags(
                    s
                      .split(',')
                      .map(s => s.trim())
                      .filter(s => s)
                  )
                }}
              />
            </Form.Item>
            <Form.Item
              name='buy_price'
              rules={[{ required: true, message: 'Please input buy price!' }]}>
              <InputNumber placeholder='Buy price' />
            </Form.Item>
            <Form.Item
              name='name'
              rules={[
                { required: true, message: 'Please input delivery price!' },
              ]}>
              <InputNumber placeholder='Delivery price' />
            </Form.Item>
            <Form.Item>
              <Button
                style={{ width: '100%' }}
                type='primary'
                htmlType='submit'>
                Create new category
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
      {/* <div style={{ width: 'fit-content' }}>
        <Card title='All categories'>
          <Table dataSource={categories} columns={columns} />
        </Card>
      </div> */}
    </div>
  )
}

export default Products
