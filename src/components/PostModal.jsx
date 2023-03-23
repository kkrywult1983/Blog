import { Form, Input, Modal } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { showErrorNotification, showSuccessNotification } from 'helpers'
import PropTypes from 'prop-types'
import { useCallback } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import postService from 'services/post'

const { TextArea } = Input

const PostModal = ({ initialValues, closeModal, isVisible }) => {
  const [form] = useForm()
  const queryClient = useQueryClient()

  const handleSuccess = () => {
    showSuccessNotification()
    closeModal()
  }
  const handleError = ({ message }) => showErrorNotification(message)

  const { mutate: createPost, isLoading: isCreating } = useMutation(
    (variables) => postService.createPost(variables),
    {
      onSuccess: () => {
        queryClient.refetchQueries('posts')
        handleSuccess()
      },
      onError: handleError,
    }
  )

  const { mutate: editPost, isLoading: isEditing } = useMutation(
    (variables) => postService.updatePost(initialValues.id, variables),
    {
      onSuccess: () => {
        queryClient.refetchQueries(['post', `${initialValues.id}`])
        handleSuccess()
      },
      onError: handleError,
    }
  )

  const handleFormSubmit = useCallback(
    (values) => {
      if (initialValues) {
        return editPost(values)
      }

      return createPost({ ...values, likesCount: 0 })
    },
    [initialValues]
  )

  const title = initialValues ? 'Edit post' : 'Create post'

  return (
    <Modal
      open={isVisible}
      onCancel={closeModal}
      title={title}
      onOk={form.submit}
      confirmLoading={isCreating || isEditing}
      destroyOnClose
    >
      <Form
        onFinish={handleFormSubmit}
        layout="vertical"
        form={form}
        preserve={false}
        initialValues={initialValues}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: 'Post title is required',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="body"
          label="Content"
          rules={[
            {
              required: true,
              message: 'Post content is required',
            },
          ]}
        >
          <TextArea rows={20} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export const InitialValuesPropType = PropTypes.exact({
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  likesCount: PropTypes.number.isRequired,
})

PostModal.propTypes = {
  initialValues: InitialValuesPropType,
  isVisible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default PostModal
