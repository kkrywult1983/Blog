import { List, Space, Button, Typography } from "antd";
import { LikeOutlined } from "@ant-design/icons";
import React from "react";
const { Paragraph } = Typography;

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
    <Button>Read more</Button>
  </Space>
);

const PostPreview = (props) => {
  const postsDatas = props.posts.map((postData) => {
    return {
      title: postData.title,
      content: postData.body,
      likesCount: postData.likesCount,
    };
  });

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        pageSize: 5,
      }}
      dataSource={postsDatas}
      renderItem={(item) => (
        <List.Item
          key={item.title}
          actions={[
            <IconText
              icon={LikeOutlined}
              text={item.likesCount}
              key="list-vertical-like-o"
            />,
          ]}
        >
          <List.Item.Meta title={<a href={item.href}>{item.title}</a>} />
          <Paragraph
            style={{ width: "100%" }}
            ellipsis={{
              rows: 2,
              expandable: false,

              suffix: `${item.title}`,
            }}
          >
            {item.content}
          </Paragraph>
        </List.Item>
      )}
    />
  );
};

export default PostPreview;
