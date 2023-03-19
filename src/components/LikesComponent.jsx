// @ts-nocheck
import { DislikeOutlined, LikeOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'

const LikesComponent = (props) => {
  const handleLike = (post) => {
    const updatePost = { ...post, likesCount: post.likesCount + 5 }
    props.mutate(updatePost)
  }

  const handleDislike = () => {
    const updatePost = { ...props.post, likesCount: props.post.likesCount - 10 }
    props.mutate(updatePost)
  }

  return (
    <>
      <Space key="LikeButton">
        <Button
          type="link"
          key="likesCount"
          icon={<LikeOutlined />}
          disabled={props.isLoading || props.isLoadingAfterUpdate}
          onClick={() => handleLike(props.post)}
        />
        {props.post?.likesCount}
        <Button
          type="link"
          key="dislikesCount"
          icon={<DislikeOutlined />}
          disabled={props.isLoading || props.isLoadingAfterUpdate}
          onClick={handleDislike}
        />
      </Space>
    </>
  )
}

export default LikesComponent
