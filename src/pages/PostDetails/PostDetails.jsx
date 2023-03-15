import { DislikeOutlined, EditOutlined, LikeOutlined } from '@ant-design/icons'
import { Button, Card, Col, Row, Skeleton, Space } from 'antd'
import { showSuccessNotification } from 'helpers/showSuccessNotification'
import CreatePostModal from 'pages/PostsList/components/CreatePostModal'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import postService from 'services/post'

const { Meta } = Card

const PostDetails = () => {
  const { postId } = useParams()
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { isLoading: isLoadingAfterUpdate, mutate } = useMutation(
    (data) => {
      return postService.updatePost(postId, data)
    },
    {
      onSuccess: () => {
        showSuccessNotification('Likes updated')
        queryClient.invalidateQueries(['post', postId])
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

  const {
    isLoading,
    data: post,
    error,
  } = useQuery(['post', postId], () => postService.fetchPost(postId))

  const handleNotFoundPage = () => navigate('/not-found')

  if (error?.message === 'Not found') {
    handleNotFoundPage()
  } else if (error) {
    return <h1>{error.message}</h1>
  }

  return (
    <Row justify="center">
      <Col md={20}>
        <Card
          actions={[
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
              <CreatePostModal props={post} title="Edit post" key={post?.id} />
            </Space>,
          ]}
        >
          <Skeleton loading={isLoading} active title paragraph={{ rows: 10 }}>
            <Meta title={post?.title} description={post?.body} />
          </Skeleton>
        </Card>
      </Col>
    </Row>
  )
}
export default PostDetails
