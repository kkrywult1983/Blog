import { Form, Input } from 'antd'
import { showErrorNotification } from 'helpers/showErrorNotification'
import { showSuccessNotification } from 'helpers/showSuccessNotification'
import { useMutation, useQueryClient } from 'react-query'
import postService from 'services/post'

const PostForm = ({ form, onCancel, props }) => {
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

  let title = ''
  let body = ''

  if (props.props) {
    title = props.props.title
    body = props.props.body
  }

  const { TextArea } = Input

  return (
    <Form
      name="createPost"
      onFinish={handleFormSubmit}
      layout="vertical"
      form={form}
    >
      <Form.Item name="title" label="Title">
        <Input defaultValue={title} />
      </Form.Item>
      <Form.Item name="body" label="Post Content">
        <TextArea autoSize={{ minRows: 3, maxRows: 6 }} defaultValue={body} />
      </Form.Item>
    </Form>
  )
}

export default PostForm
