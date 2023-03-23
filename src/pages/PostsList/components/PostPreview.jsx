// @ts-nocheck
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  LikeOutlined,
} from '@ant-design/icons'
import { Button, List, Modal, Typography } from 'antd'
import { showErrorNotification, showSuccessNotification } from 'helpers'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import postService from 'services/post'
import styled from 'styled-components'
import { Likes } from './Likes'

const { Paragraph } = Typography

const ExtraContentWrapper = styled.div`
  display: flex;
  align-items: end;
  height: 100%;
`

const ExtraButtonWrapper = styled.div`
  padding-right: 10px;
`

const PostPreview = ({ post }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
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
  const handleOk = () => {
    mutate()
  }

  const confirm = () => {
    Modal.confirm({
      title: 'Delete post',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to delete post',
      onOk: handleOk,
      // @ts-ignore
      confirmLoading: isLoading,
    })
  }

  return (
    <List.Item
      // key={post.title}
      actions={[
        //   <IconText
        //     icon={LikeOutlined}
        //     text={post.likesCount}
        //     key="list-vertical-like-o"
        //   />,
        <Likes postId={post.id} />,
      ]}
      extra={
        <ExtraContentWrapper>
          <ExtraButtonWrapper>
            <Button type="primary" onClick={() => handleNavigate(post.id)}>
              Read more
            </Button>
          </ExtraButtonWrapper>
          <ExtraButtonWrapper>
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              loading={isLoading}
              onClick={confirm}
            >
              Delete post
            </Button>
          </ExtraButtonWrapper>
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
