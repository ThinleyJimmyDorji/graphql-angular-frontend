import { Injectable } from '@angular/core';
import { Apollo, gql} from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  constructor(private apollo: Apollo) { }

  getPost(id: number) {
    return this.apollo.query({
      query: gql`
        query post($id: ID!){
          post(id: $id) {
            id
            body
            title
            user {
              name
            }
            comments {
              data {
                id
              }
            }
          }
        }
      `,
      variables: {id}
    });
  }

  deleteComment(id: number) {
    return this.apollo.mutate({
      mutation: gql`
        mutation deleteComment($id: ID!){
          deleteComment(id: $id)
        }
      `,
      variables: {id}
    });
  }

  getUserProfile(id: number) {
    return this.apollo.query({
      query: gql`
        query user($id: ID!){
          user(id: $id) {
            id
            name
          }
        }
      `,
      variables: {id}
    });
  }
  getPosts() {
    return this.apollo.query({
      query: gql`
        query {
          posts {
            data {
              id
              title
              body
              user {
                id
                name
              }
              comments {
                data {
                  id
                  name
                  body
                }
              }
            }
          }
        }
      `,
    });
  }

  createPost(title: string, body: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation($input: CreatePostInput!) {
          createPost(input: $input) {
            id
            title
            body
          }
        }
      `,
      variables: {
        input: { title, body },
      },
    });
  }

  updatePost(id: string, title: string, body: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation($id: ID!, $input: UpdatePostInput!) {
          updatePost(id: $id, input: $input) {
            id
            title
            body
          }
        }
      `,
      variables: {
        id,
        input: { title, body },
      },
    });
  }

  deletePost(id: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation($id: ID!) {
          deletePost(id: $id)
        }
      `,
      variables: {
        id,
      },
    });
  }
}
