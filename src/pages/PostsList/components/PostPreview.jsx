import { Avatar, List, Space, Button } from "antd";
import { LikeOutlined } from "@ant-design/icons";
import React from "react";

const PostPreview = (props) => {
  const postsDatas = props.posts.map((postData) => {
    return {
      title: postData.title,
      avatar: "https://xsgames.co/randomusers/avatar.php?g=male",
      shortContent: postData.body.match(/^[^.]+\.[^.]+\.[^.]+\.[^.]+\./),
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
        pageSize: 4,
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
            title={item.title}
          />
          <div className="contentdiv">{item.shortContent}</div>
        </List.Item>
      )}
    />
  );
};

export default PostPreview;
