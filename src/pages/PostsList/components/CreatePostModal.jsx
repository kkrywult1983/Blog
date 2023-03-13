import { PlusOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { PostForm } from 'components'
import { useState } from 'react'
import styled from 'styled-components'

const ExtraContentWrapper = styled.div`
  display: flex;
  align-items: end;
  height: 100%;
`

const CreatePostModal = () => {
  const [open, setOpen] = useState(false)
  const [form] = useForm()

  const toggleModalVisibility = () => setOpen((prev) => !prev)

  return (
    <>
      <ExtraContentWrapper>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={toggleModalVisibility}
        >
          Add Post
        </Button>
      </ExtraContentWrapper>
      <Modal
        open={open}
        onCancel={toggleModalVisibility}
        title="Create post"
        onOk={form.submit}
      >
        <PostForm form={form} onCancel={toggleModalVisibility} />
      </Modal>
    </>
  )
}

export default CreatePostModal
