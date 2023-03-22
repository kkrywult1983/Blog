import { DislikeOutlined, LikeOutlined } from '@ant-design/icons'
import { Button, Space, List } from 'antd'
import { IconText } from 'components'
import { showSuccessNotification, showErrorNotification } from 'helpers'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import postService from 'services/post'

export const Likes = (props) => {
  const { postId } = useParams()
  const queryClient = useQueryClient()

  const {
    isLoading,
    data: post,
    error,
  } = useQuery(['post', postId || String(props.postId)], () =>
    postService.fetchPost(postId || String(props.postId))
  )

  const { mutate, isLoading: isLoadingAfterUpdate } = useMutation(
    (data) => {
      return postService.updatePost(postId || String(props.postId), data)
    },
    {
      onSuccess: () => {
        showSuccessNotification('Likes updated')
        queryClient.invalidateQueries(['post'])
      },
      onError: () => showErrorNotification('Problem with likes update'),
    }
  )

  const handleLike = (post) => {
    const updatePost = { ...post, likesCount: post.likesCount + 5 }
    mutate(updatePost)
  }

  const handleDislike = () => {
    const updatePost = { ...post, likesCount: post.likesCount - 10 }
    mutate(updatePost)
  }

  return (
    <Space key="LikeButton">
      <Button
        type="link"
        key="likesCount"
        icon={<LikeOutlined />}
        disabled={isLoading || isLoadingAfterUpdate}
        onClick={() => handleLike(post)}
      />
      {post?.likesCount}
      <Button
        type="link"
        key="dislikesCount"
        icon={<DislikeOutlined />}
        disabled={isLoading || isLoadingAfterUpdate}
        onClick={handleDislike}
      />
    </Space>
  )
}
