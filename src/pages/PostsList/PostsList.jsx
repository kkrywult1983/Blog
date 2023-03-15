import { Col, List, Row, Typography } from 'antd'
import { Loading } from 'components'
import { useState } from 'react'
import { useQuery } from 'react-query'
import postService from 'services/post'

import { PostPreview } from './components'
import CreatePostModal from './components/CreatePostModal'

const { Title } = Typography

const LIMIT = 10

const PostsList = () => {
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  const {
    isLoading,
    data: posts,
    error,
  } = useQuery(['posts', page], async () => {
    const { response, totalCount } = await postService.fetchPaginatedPosts(
      page,
      LIMIT
    )

    setTotalCount(totalCount)
    return response
  })

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
            pagination={{
              onChange: (page) => {
                setPage(page)
              },
              pageSize: LIMIT,
              current: page,
              total: +totalCount,
            }}
            renderItem={(post) => <PostPreview post={post} />}
          />
        </Row>
      )}
    </>
  )
}

export default PostsList
