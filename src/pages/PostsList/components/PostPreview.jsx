import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  LikeOutlined,
} from '@ant-design/icons'
import { Button, List, Modal, Typography } from 'antd'
import { IconText } from 'components'
import { showErrorNotification, showSuccessNotification } from 'helpers'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import postService from 'services/post'
import styled from 'styled-components'

const { Paragraph } = Typography

const ExtraContentWrapper = styled.div`
  display: flex;
  align-items: end;
  height: 100%;
`

const PostPreview = ({ post }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [isConfirmationModal, setIsConfirmationModal] = useState(false)

  const handleNavigate = (postId) => navigate(`/posts/${postId}`)

  const { isLoading, mutate } = useMutation(
    () => postService.deletePost(post.id),
    {
      onSuccess: () => {
        showSuccessNotification()
        queryClient.invalidateQueries('posts')
      },
      onError: (error) => {
        showErrorNotification(error.message)
      },
    }
  )

  const confirm = () => {
    Modal.confirm({
      title: 'Delete post',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to delete post',
      onOk: handleOk,
      confirmLoading: isLoading,
    })
  }

  const handleOk = () => {
    mutate()
  }

  return (
    <List.Item
      key={post.title}
      actions={[
        <IconText
          icon={LikeOutlined}
          text={post.likesCount}
          key="list-vertical-like-o"
        />,
      ]}
      extra={
        <ExtraContentWrapper>
          <Button type="primary" onClick={() => handleNavigate(post.id)}>
            Read more
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            loading={isLoading}
            onClick={confirm}
          >
            Delete post
          </Button>
        </ExtraContentWrapper>
      }
    >
      <List.Item.Meta title={post.title} />
      <Paragraph ellipsis={{ rows: 2, expandable: false }}>
        {post.body}
      </Paragraph>
    </List.Item>
  )
}

export default PostPreview
