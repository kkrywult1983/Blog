/* eslint-disable no-console */
import { List } from 'antd'
import { Loading } from 'components'
import { useEffect, useState } from 'react'
import postService from 'services/post'

import { PostPreview } from './components'

const PostsList = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    postService
      .fetchPosts()
      .then((data) => {
        setPosts(data)
      })
      .catch((err) => console.log({ err }))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <List
          itemLayout="vertical"
          size="large"
          dataSource={posts}
          renderItem={(post) => <PostPreview post={post} />}
        />
      )}
    </>
  )
}

export default PostsList
