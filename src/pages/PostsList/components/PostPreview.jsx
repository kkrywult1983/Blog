import { Avatar, List, Space } from "antd";
import { LikeOutlined } from "@ant-design/icons";
import React from "react";

const data = Array.from({
  length: 23,
}).map((posts, i) => ({
  href: "http://localhost:3000/posts",
  title: `ant design part ${i}`,
  avatar: "https://xsgames.co/randomusers/avatar.php?g=male",
  content: posts.body,
}));

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const PostPreview = () => (
  <List
    itemLayout="vertical"
    size="large"
    pagination={{
      pageSize: 4,
    }}
    dataSource={data}
    renderItem={(item) => (
      <List.Item
        key={item.title}
        actions={[
          <IconText
            icon={LikeOutlined}
            text="156"
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

// Zwrócić tytuł, ilość like, wzrócić 2 linijni tesktu, dodać buton "read more"

// zrobić nowy komponent do renderowania postów ??

export default PostPreview;
