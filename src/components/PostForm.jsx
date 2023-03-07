import { Form, Input } from 'antd'

const PostForm = ({ form }) => {
  const handleFormSubmit = (values) => console.log('Finish', { values })

  return (
    <Form
      name="createPost"
      onFinish={handleFormSubmit}
      layout="vertical"
      form={form}
    >
      <Form.Item name="title" label="Title">
        <Input />
      </Form.Item>
    </Form>
  )
}

export default PostForm
