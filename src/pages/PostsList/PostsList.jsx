import { Col, List, Row, Typography } from 'antd'
import { Loading } from 'components'
import { useQuery } from 'react-query'
import postService from 'services/post'

import { PostPreview } from './components'
import CreatePostModal from './components/CreatePostModal'

const { Title } = Typography

const PostsList = () => {
  const {
    isLoading,
    data: posts,
    error,
  } = useQuery('posts', postService.fetchPosts)

  if (error) {
    return <h1>{error.message}</h1>
  }

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <Row gutter={[16, 16]} justify="end">
          {' '}
          <Col>
            <CreatePostModal />
          </Col>
          <List
            header={<Title style={{ paddingLeft: '24px' }}>Posts</Title>}
            itemLayout="vertical"
            size="large"
            dataSource={posts}
            renderItem={(post) => <PostPreview post={post} />}
          />
        </Row>
      )}
    </>
  )
}

export default PostsList
