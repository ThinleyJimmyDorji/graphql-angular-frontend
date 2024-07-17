import { Injectable } from '@angular/core';
import { Apollo, gql} from 'apollo-angular';
import {DocumentNode, TypedDocumentNode} from '@apollo/client';
import {map, Observable} from 'rxjs';
import {Media, Page, PageInfo} from '../../generated/graphql';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  constructor(private apollo: Apollo, private http: HttpClient) { }

  getMultipleMedia(search?: string): Observable<{ Page: { media: Media[], pageInfo: PageInfo }}> {
    return this.apollo.query({
      query: gql`
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
      ` as (DocumentNode | TypedDocumentNode),
      variables: {
        page: 1,
        perPage: 10,
        search
      },
      fetchPolicy: 'no-cache'
    }).pipe(map(response => response.data)) as Observable<{ Page: { media: Media[], pageInfo: PageInfo }}>
  }

  getMediaByID(id: number): Observable<Media> {
    return this.apollo.query({
      query: gql`
        query getMediaByID($id: Int)  {
          Media(id: $id) {
            id
            type
            title {
              native
              userPreferred
              english
            }
          }
        }
      ` as (DocumentNode | TypedDocumentNode),
      variables: {
        id
      },
      fetchPolicy: 'no-cache'
    }).pipe(map(response => response.data)) as Observable<Media>
  }

  toggleFollow(userId: number) {
    return this.apollo.mutate({
      mutation: gql`
        mutation toggleFollow($userId: Int) {
          ToggleFollow (userId: $userId){
            name
            id
          }
        }
      `,
      variables: {userId}
    })
  }
}
