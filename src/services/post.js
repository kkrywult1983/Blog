/* eslint-disable no-console */
import { isEmpty } from 'lodash'

const BASE_URL = 'http://localhost:3000/posts'

const postService = {
  fetchPosts: () => fetch(BASE_URL).then((response) => response.json()),

  fetchPost: (postId) =>
    fetch(`${BASE_URL}/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        if (isEmpty(data)) {
          throw new Error('Not found')
        }

        return data
      }),

  updatePosts: (postId, body) =>
    fetch(`${BASE_URL}/${postId}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Contetn=Type': 'application/json',
      },
    }).then((response) => response.json()),

  createPosts: (body) =>
    fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Contetn=Type': 'application/json',
      },
    }).then((response) => response.json()),

  deletePost: (postId) =>
    fetch(`${BASE_URL}/${postId}`).then((response) => response.json()),
}

export default postService
