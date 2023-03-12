import NotFound from 'pages/NotFound/NotFound'
import { Navigate, Route, Routes } from 'react-router-dom'

import MainLayout from './components/MainLayout'
import { PostsList } from './pages'
import PostDetails from './pages/PostDetails'

const App = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route path="posts">
        <Route index element={<PostsList />} />
        <Route path=":postId" element={<PostDetails />} />
      </Route>
    </Route>
    <Route path="not-found" element={<NotFound />} />
    <Route path="*" element={<Navigate to="posts" replace />} />
  </Routes>
)
export default App
