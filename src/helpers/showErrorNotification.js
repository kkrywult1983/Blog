import { notification } from 'antd'

export const showErrorNotification = (message = 'error') =>
  notification.error({ message })
