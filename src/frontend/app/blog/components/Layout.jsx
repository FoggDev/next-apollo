import { gql } from 'apollo-boost'
import { useQuery } from '@hooks'

const Layout = () => {
  const { data } = executeQuery()

  if (data && data.allPosts) {
    return (
      <div>
        {data.allPosts.map(post => (
          <>
            <a href={post.url}>{post.title}</a>
            <div dangerouslySetInnerHTML={{ __html: post.body }} />
          </>
        ))}
      </div>
    )
  }

  return <div>Loading...</div>
}

function executeQuery() {
  const QUERY_ALL_POSTS = gql`
    query allPosts {
      allPosts {
        id
        title
        body
        createdAt
      }
    }
  `

  return useQuery({
    query: QUERY_ALL_POSTS
  })
}


export default Layout
