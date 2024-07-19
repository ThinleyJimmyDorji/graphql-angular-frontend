import {gql} from 'apollo-angular';
import {DocumentNode, TypedDocumentNode} from '@apollo/client';

export const THREAD_LIST_QUERY:(DocumentNode | TypedDocumentNode) = gql`
  query getThreadList($page: Int, $perPage: Int,) {
    Page(perPage: $perPage, page: $page) {
      pageInfo {
        perPage
        total
        currentPage
        hasNextPage
      }
      threads {
        id
        title
        body
        likeCount
        replyCount
        user {
          id
          name
          bannerImage
          avatar {
            medium
          }
        }
        replyCommentId
        likes {
          id
          name
        }
      }
    }
  }
`

export const THREAD_COMMENT_LIST_QUERY:(DocumentNode | TypedDocumentNode) = gql`
  query getThreadList($page: Int, $perPage: Int, $threadId: Int) {
    Page(perPage: $perPage, page: $page) {
      pageInfo {
        perPage
        total
        currentPage
        hasNextPage
      }
      threadComments(threadId: $threadId) {
        threadId
        id
        likeCount
        comment
        childComments
        isLiked
        user {
          name
          bannerImage
          avatar {
            medium
          }
        }
        likes {
          name
        }
      }
    }
  }
`

export const THREAD_QUERY:(DocumentNode | TypedDocumentNode) = gql`
  query getThread($id: Int) {
    Thread(id: $id) {
      id
      title
      body
      likeCount
      replyCount
      user {
        id
        name
        bannerImage
        avatar {
          medium
        }
      }
      replyCommentId
      likes {
        id
        name
      }
    }
  }
`
export const MEDIA_LIST_QUERY:(DocumentNode | TypedDocumentNode) = gql`
  query getMediaLists($page: Int, $perPage: Int, $search: String)  {
    Page(page: $page, perPage: $perPage ) {
      pageInfo {
        currentPage
        hasNextPage
        lastPage
        perPage
        total
      }
      media(search: $search) {
        id
        siteUrl
        bannerImage
        title {
          english
          native
          romaji
          userPreferred
        }
        episodes
        rankings {
          season
          type
          year
          rank
        }

        #              characters {
        #                nodes {
        #                  id
        #                  image {
        #                    medium
        #                    large
        #                  }
        #                  name {
        #                    first
        #                    middle
        #                    last
        #                    userPreferred
        #                    full
        #                    native
        #                  }
        #                }
        #              }

        #              reviews {
        #                edges {
        #                  node {
        #                    id
        #                    user {
        #                      id
        #                      name
        #                    }
        #                  }
        #                }
        #                nodes {
        #                  id
        #                  body
        #                  score
        #                  mediaType
        #                  userRating
        #                  summary
        #                }
        #              }
        description
      }
    }
  }
`;

export const MEDIA_QUERY: DocumentNode | TypedDocumentNode = gql`
  query getMediaByID($id: Int, $perPage: Int)  {
    Media(id: $id) {
      id
      type
      bannerImage
      description
      isFavourite
      reviews {
        nodes {
          id
          userRating
          body
          summary
          rating
          score
          ratingAmount

        }
      }
      characters(perPage: $perPage) {
        nodes {
          id
          age
          gender
          image {
            large
            medium
          }
          name {
            full
          }

        }
      }

      title {
        native
        userPreferred
        english
        romaji
      }
      episodes
      reviews {
        nodes {
          id
          userRating
          score
        }
      }
    }
  }
`;
