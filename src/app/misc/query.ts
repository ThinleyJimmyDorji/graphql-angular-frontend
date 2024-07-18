import {gql} from 'apollo-angular';
import {DocumentNode, TypedDocumentNode} from '@apollo/client';

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
  query getMediaByID($id: Int)  {
    Media(id: $id) {
      id
      type
      bannerImage
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
