// @ts-nocheck
import { Col, Row, Card, Skeleton } from 'antd'
import { showSuccessNotification } from 'helpers/showSuccessNotification'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import postService from 'services/post'
import { LikesComponent } from 'components'
import CreatePostModal from 'pages/PostsList/components/CreatePostModal'

const PostDetails = () => {
  const { postId } = useParams()
  const navigate = useNavigate()

  const { Meta } = Card

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
            <LikesComponent
              isLoadingAfterUpdate={isLoadingAfterUpdate}
              isLoading={isLoading}
              post={post}
              mutate={mutate}
            />,
            <CreatePostModal props={post} title="Edit post" key={post?.id} />,
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
