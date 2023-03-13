import { Form, Input } from 'antd'
import { showErrorNotification } from 'helpers/showErrorNotification'
import { showSuccessNotification } from 'helpers/showSuccessNotification'
import { useMutation, useQueryClient } from 'react-query'
import postService from 'services/post'

const PostForm = ({ form, onCancel }) => {
  const queryClient = useQueryClient()

  const handleFormSubmit = (values) => {
    mutate(values)
    onCancel()
  }

  const { mutate } = useMutation(
    (variables) => {
      postService.createPost(variables)
    },

    {
      onSuccess: () => {
        showSuccessNotification()
        queryClient.invalidateQueries('posts')
      },
      onError: (error) => showErrorNotification(error.message),
    }
  )

  const validateMessage = {
    required: 'Title is required',
  }

  const { TextArea } = Input

  return (
    <Form
      name="createPost"
      onFinish={handleFormSubmit}
      layout="vertical"
      form={form}
      validateMessages={validateMessage}
    >
      <Form.Item name="title" label="Title">
        <Input required />
      </Form.Item>
      <Form.Item name="body" label="Post Content">
        <TextArea autoSize={{ minRows: 3, maxRows: 6 }} required />
      </Form.Item>
    </Form>
  )
}

export default PostForm
