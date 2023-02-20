import { LikeOutlined } from '@ant-design/icons'
import { IconText, Loading } from 'components'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import postService from 'services/post'

const PostDetails = () => {
  const navigate = useNavigate()
  const { postId } = useParams()
  const [post, setPost] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    postService
      .fetchPost(postId)
      .then((data) => {
        setPost(data)
        setLoading(false)
      })
      .catch((err) => {
        if (err.message === 'Not found') {
          navigate('/not-found')
        }
      })
  }, [])

  return (
    <>
      {loading && <Loading />}
      {!loading && (
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
