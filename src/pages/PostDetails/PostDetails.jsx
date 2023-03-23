// @ts-nocheck

// @ts-ignore
import { Card, Col, Row, Skeleton } from 'antd'
import CreatePostModal from 'pages/PostsList/components/CreatePostModal'
import { Likes } from 'pages/PostsList/components/Likes'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import postService from 'services/post'
import { EditPostModal } from './components'

const { Meta } = Card

const PostDetails = () => {
  const { postId } = useParams()
  const navigate = useNavigate()

  const {
    isLoading,
    data: post,
    error,
  } = useQuery(['post', postId], () => postService.fetchPost(postId))

  const handleNotFoundPage = () => navigate('/not-found')

  // @ts-ignore
  if (error?.message === 'Not found') {
    handleNotFoundPage()
  } else if (error) {
    // @ts-ignore
    return <h1>{error.message}</h1>
  }

  return (
    <Row justify="center">
      <Col md={20}>
        <Card
          actions={[
            <Likes />,
            <EditPostModal
              key="edit"
              disabled={isLoading}
              initialValues={post}
            />,
            <CreatePostModal title="Edit post" />,
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
