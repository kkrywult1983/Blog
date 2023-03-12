import { LikeOutlined } from '@ant-design/icons'
import { IconText, Loading } from 'components'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import postService from 'services/post'

const PostDetails = () => {
  const { postId } = useParams()
  const navigate = useNavigate()

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
          <IconText icon={LikeOutlined} text={post.likesCount} />
        </>
      )}
    </>
  )
}
export default PostDetails
