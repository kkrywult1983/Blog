import { LikeOutlined } from '@ant-design/icons'
import { IconText, Loading } from 'components'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const PostDetails = () => {
  const { postId } = useParams()
  const [post, setPost] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data)
      })
      .finally(() => setLoading(false))
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
