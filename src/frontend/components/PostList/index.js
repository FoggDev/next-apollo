import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import PostUpvoter from "../PostUpvoter";

import ErrorMessage from "../ErrorMessage";
import {
  Container,
  List,
  ListItem,
  ListItemContainer,
  Num,
  A,
  Button
} from "./styles";

const POSTS_PER_PAGE = 10;

const GET_POSTS = gql`
  query allPosts {
    allPosts {
      id
      title
      body
      createdAt
    }
  }
`;

function PostList() {
  const { loading, error, data, fetchMore } = useQuery(GET_POSTS, {
    variables: { skip: 0, first: POSTS_PER_PAGE },
    notifyOnNetworkStatusChange: true
  });
  console.log('DATA===', data)
  if (data && data.allPosts) {
    return (
      <Container>
        <List>
          {data.allPosts.map((post, index) => (
            <ListItem key={post.id}>
              <ListItemContainer>
                <Num>{index + 1}. </Num>
                <A href={post.url}>{post.title}</A>
                <div dangerouslySetInnerHTML={{ __html: post.body }} />
              </ListItemContainer>
            </ListItem>
          ))}
        </List>
      </Container>
    );
  }
  return <div>Loading...</div>;
}

export default PostList;
