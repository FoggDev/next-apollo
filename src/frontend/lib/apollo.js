import { withData } from 'next-apollo'
import { HttpLink } from 'apollo-boost'

const config = {
  link: new HttpLink({
    uri: 'http://localhost:5000/graphiql', // Server URL (must be absolute)
  })
}

export default withData(config)
