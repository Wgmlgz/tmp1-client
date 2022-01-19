import { Button, Card, Form, Input, InputNumber, Table, Tag } from 'antd'
import React, { useCallback, useRef, useState } from 'react'
import { Collapse } from 'antd'

const { Panel } = Collapse

export interface IProduct {
  type?: string
  category?: string
  article?: string
  name: string
  description?: string
  tags?: string[]
  imgs?: FileList
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

let imgs: FileList | undefined = undefined

const Products = () => {
  const [tags, setTags] = useState<string[]>([])
  const input_tags_ref = useRef<Input>(null)

  const Data = () => (
    <>
      <Form.Item label='Type' name='type'>
        <Input placeholder='Type' />
      </Form.Item>
      <Form.Item label='Category' name='category'>
        <Input placeholder='Category' />
      </Form.Item>
      <Form.Item label='Article' name='article'>
        <Input placeholder='Article' />
      </Form.Item>
    </>
  )

  const Media = () => (
    <>
      <Form.Item label='Images' name='imgs'>
        <Input
          type='file'
          accept='.png, .jpg, .jpeg'
          name='imgs'
          multiple
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            const imgs_ = e.target.files
            if (!imgs_) return
            imgs = imgs_
          }}
        />
      </Form.Item>
      <Form.Item label='Youtube video 1' name='yt1'>
        <Input placeholder='Youtube video 1' />
      </Form.Item>
      <Form.Item label='Youtube video 2' name='yt2'>
        <Input placeholder='Youtube video 2' />
      </Form.Item>
      <Form.Item label='Youtube video 3' name='yt3'>
        <Input placeholder='Youtube video 3' />
      </Form.Item>
    </>
  )
  const Prices = () => (
    <>
      <Form.Item
        label='Buy price'
        name='buy_price'
        rules={[{ required: true, message: 'Please input buy price!' }]}>
        <InputNumber placeholder='Buy price' />
      </Form.Item>
      <Form.Item
        label='Delivery price'
        name='delivery_price'
        rules={[{ required: true, message: 'Please input delivery price!' }]}>
        <InputNumber placeholder='Delivery price' />
      </Form.Item>
    </>
  )
  const Dimentions = () => (
    <>
      <Form.Item
        label='Height'
        name='height'
        rules={[{ required: true, message: 'Please input height!' }]}>
        <InputNumber placeholder='Height' />
      </Form.Item>
      <Form.Item
        label='Length'
        name='length'
        rules={[{ required: true, message: 'Please input length!' }]}>
        <InputNumber placeholder='Length' />
      </Form.Item>
      <Form.Item
        label='Width'
        name='width'
        rules={[{ required: true, message: 'Please input width!' }]}>
        <InputNumber placeholder='Width' />
      </Form.Item>
      <Form.Item
        label='Weight'
        name='weight'
        rules={[{ required: true, message: 'Please input weight!' }]}>
        <InputNumber placeholder='Weight' />
      </Form.Item>
    </>
  )

  const Origins = () => (
    <>
      <Form.Item label='Brand' name='brand'>
        <Input placeholder='Brand' />
      </Form.Item>
      <Form.Item label='Count' name='count'>
        <InputNumber placeholder='Count' />
      </Form.Item>
      <Form.Item label='Provider' name='provider'>
        <Input placeholder='Provider' />
      </Form.Item>
      <Form.Item label='Address' name='address'>
        <Input placeholder='Address' />
      </Form.Item>
    </>
  )

  const onFinish = ({
    address,
    article,
    brand,
    buy_price,
    category,
    count,
    delivery_price,
    description,
    height,
    length,
    name,
    provider,
    type,
    weight,
    width,
    yt1,
    yt2,
    yt3,
  }: any) => {
    if (
      name === undefined ||
      buy_price === undefined ||
      delivery_price === undefined ||
      height === undefined ||
      length === undefined ||
      width === undefined ||
      weight === undefined
    )
      return
    const videos = [yt1, yt2, yt3]
    const product: IProduct = {
      type,
      category,
      article,
      name,
      description,
      tags,
      imgs,
      videos,
      buy_price,
      delivery_price,
      height,
      length,
      width,
      weight,
      brand,
      count,
      address,
      provider,
    }
    console.log(product)

    // console.log(values)
  }
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <div style={{ width: '500px' }}>
        <Card title='Create new product'>
          <Form name='normal_login' className='login-form' onFinish={onFinish}>
            <Collapse defaultActiveKey={['1']}>
              <Panel header='Data' key='1'>
                <Data />
              </Panel>
              <Panel header='Description' key='2'>
                <Form.Item
                  label='Name'
                  name='name'
                  rules={[{ required: true, message: 'Please input name!' }]}>
                  <Input placeholder='Name' />
                </Form.Item>
                <Form.Item label='Description' name='description'>
                  <Input.TextArea placeholder='Description' />
                </Form.Item>
                <Form.Item label='Tags'>
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
                      const new_tags = s
                        .split(',')
                        .map(s => s.trim())
                        .filter(s => s)
                      setTags(new_tags)
                    }}
                  />
                </Form.Item>
              </Panel>
              <Panel header='Media' key='3'>
                <Media />
              </Panel>
              <Panel header='Prices' key='4'>
                <Prices />
              </Panel>
              <Panel header='Dimentions' key='5'>
                <Dimentions />
              </Panel>
              <Panel header='Origins' key='6'>
                <Origins />
              </Panel>
            </Collapse>
            <br />
            <Form.Item>
              <Button
                style={{ width: '100%' }}
                type='primary'
                htmlType='submit'>
                Create new product
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
