import { EditOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { PostModal } from 'components'
import { InitialValuesPropType } from 'components/PostModal'
import PropTypes from 'prop-types'
import { useState } from 'react'

const EditPostModal = ({ disabled, initialValues }) => {
  const [open, setOpen] = useState(false)

  const toggleModalVisibility = () => setOpen((prev) => !prev)

  return (
    <>
      <Button
        type="link"
        key="edit"
        icon={<EditOutlined />}
        disabled={disabled}
        onClick={toggleModalVisibility}
      />
      <PostModal
        isVisible={open}
        closeModal={toggleModalVisibility}
        initialValues={initialValues}
      />
    </>
  )
}

EditPostModal.propTypes = {
  disabled: PropTypes.bool.isRequired,
  initialValues: InitialValuesPropType.isRequired,
}

export default EditPostModal
