import { Layout } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

const ExtraStyle = styled.div`
  color: #fff2f0;
`

const MainLayout = () => (
  <Layout style={{ height: '100vh' }}>
    <ExtraStyle>
      <Header>header</Header>
    </ExtraStyle>
    <Layout>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  </Layout>
)
export default MainLayout
