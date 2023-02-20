import { Button, Col, Result, Row } from 'antd'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const naviagte = useNavigate()
  const handleBackHome = () => naviagte('/posts')

  return (
    <Row>
      <Col>
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button type="primary" onClick={handleBackHome}>
              Back Home
            </Button>
          }
        />
      </Col>
    </Row>
  )
}

export default NotFound
