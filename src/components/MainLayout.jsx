import { Layout } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import { Outlet } from 'react-router-dom'

const MainLayout = () => (
  <Layout style={{ height: '100vh' }}>
    <Header>header</Header>
    <Layout>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  </Layout>
)
export default MainLayout
