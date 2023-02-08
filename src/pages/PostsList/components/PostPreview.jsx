import { Avatar, List, Space, Button } from "antd";
import { LikeOutlined } from "@ant-design/icons";
import React from "react";

const PostPreview = (props) => {
  const postsDatas = props.posts.map((postData) => {
    return {
      length: 23,
      title: postData.title,
      avatar: "https://xsgames.co/randomusers/avatar.php?g=male",
      content: postData.body,
      likesCount: postData.likesCount,
    };
  });

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
      <Button>Click to read more...</Button>
    </Space>
  );

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        pageSize: 2,
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
          {item.content}
        </List.Item>
      )}
    />
  );
};
// Zwrócić tytuł, ilość like, wzrócić 2 linijni tesktu, dodać buton "read more"

export default PostPreview;
