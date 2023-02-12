import { Avatar, List, Space, Button, Typography } from "antd";
import { LikeOutlined } from "@ant-design/icons";
import React from "react";
const { Paragraph } = Typography;

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const PostPreview = (props) => {
  const postsDatas = props.posts.map((postData) => {
    return {
      title: postData.title,
      avatar: "https://xsgames.co/randomusers/avatar.php?g=male",
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
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={<a href={item.href}>{item.title}</a>}
          />
          <Paragraph
            style={{ width: "100%" }}
            ellipsis={{
              rows: 3,
              expandable: true,
              symbol: <Button>Read more...</Button>,
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
