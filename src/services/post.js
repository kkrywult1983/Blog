const BASE_URL = 'http://localhost:3000/posts'

const postService = {
  fetchPosts: () => fetch(BASE_URL).then((response) => response.json()),
  fetchPaginatedPosts: (page = 1, limit = 10) =>
    fetch(`${BASE_URL}?_page=${page}&_limit=${limit}`).then((response) => {
      const totalCount = response.headers.get('x-total-count')
      if (!response.ok) {
        throw new Error('Not found')
      }

      return {
        response: response.json(),
        totalCount,
      }
    }),

  fetchPost: (postId) =>
    fetch(`${BASE_URL}/${postId}`).then((response) => {
      if (!response.ok) {
        throw new Error('Not found')
      }

      return response.json()
    }),

  updatePost: (postId, body) =>
    fetch(`${BASE_URL}/${postId}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Not found')
      }

      return response.json()
    }),

  createPost: (body) =>
    fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Your post has been not add')
      }

      return true
    }),

  deletePost: (postId) =>
    fetch(`${BASE_URL}/${postId}`, { method: 'DELETE' }).then((response) => {
      if (!response.ok) {
        throw new Error('something happend wrong')
      }

      return true
    }),
}

export default postService
