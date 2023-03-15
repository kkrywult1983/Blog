import { DislikeOutlined, LikeOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { IconText, Loading } from 'components'
import { showSuccessNotification } from 'helpers/showSuccessNotification'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import postService from 'services/post'

const PostDetails = () => {
  const { postId } = useParams()
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { isLoading: isLoadingAfterUpdate, mutate } = useMutation(
    (data) => postService.updatePost(postId, data),
    {
      onSuccess: () => {
        showSuccessNotification('Post updated')
        queryClient.invalidateQueries(['post', postId])
      },
      onError: () => {
        console.log('Error')
      },
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
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
          <Button
            type="link"
            key="likecCount"
            onClick={() => handleLike(post)}
            disabled={isLoading || isLoadingAfterUpdate}
          >
            <IconText icon={LikeOutlined} text={undefined} />
          </Button>
          <>
            <p>{post.likesCount} </p>
            <Button
              type="primary"
              onClick={() => handleDislike(post)}
              disabled={isLoading || isLoadingAfterUpdate}
            >
              <IconText icon={DislikeOutlined} text={undefined} />
            </Button>
          </>
        </>
      )}
    </>
  )
}
export default PostDetails
