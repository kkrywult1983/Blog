import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Loading } from '../../components'

const PostDetails = () => {
  const { postId } = useParams()
  const [post, setPost] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
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
      {!loading && <h1>{post && post.title}</h1>}
    </>
  )
}

export default PostDetails

// wyswietlic tytul, content i ilosc lików

// React query poczytać
