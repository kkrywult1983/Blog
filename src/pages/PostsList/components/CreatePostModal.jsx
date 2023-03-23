// import { PlusOutlined } from '@ant-design/icons'
// import { Button, Modal } from 'antd'
// import { useForm } from 'antd/es/form/Form'
// import { PostForm } from 'components'
// import { useState } from 'react'
// import styled from 'styled-components'

// const ExtraContentWrapper = styled.div`
//   display: flex;
//   align-items: end;
//   height: 100%;
// `

// const CreatePostModal = (props, title) => {
//   const [open, setOpen] = useState(false)
//   const [form] = useForm()
//   const toggleModalVisibility = () => setOpen((prev) => !prev)

//   let buttonDescription = ''

//   if (props.title) {
//     buttonDescription = props.title
//   } else {
//     buttonDescription = 'New post'
//   }

//   return (
//     <>
//       <ExtraContentWrapper>
//         <Button
//           type="primary"
//           icon={<PlusOutlined />}
//           onClick={toggleModalVisibility}
//         >
//           {buttonDescription}
//         </Button>
//       </ExtraContentWrapper>
//       <Modal
//         open={open}
//         onCancel={toggleModalVisibility}
//         title="Create post"
//         onOk={form.submit}
//       >
//         <PostForm form={form} onCancel={toggleModalVisibility} props={props} />
//       </Modal>
//     </>
//   )
// }

// export default CreatePostModal
import PlusOutlined from '@ant-design/icons'
import { Button } from 'antd'
import { PostModal } from 'components'
import { useState } from 'react'

const CreatePostModal = () => {
  const [open, setOpen] = useState(false)
  const toggleModalVisibility = () => setOpen((prev) => !prev)

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={toggleModalVisibility}
      >
        Add post
      </Button>
      <PostModal
        isVisible={open}
        closeModal={toggleModalVisibility}
        initialValues={undefined}
      />
    </>
  )
}

export default CreatePostModal
