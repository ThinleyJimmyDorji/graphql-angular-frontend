import { Injectable } from '@angular/core';
import { Apollo, gql} from 'apollo-angular';
import {DocumentNode, TypedDocumentNode} from '@apollo/client';
import {map, Observable} from 'rxjs';
import {Media, Page, PageInfo} from '../../generated/graphql';
import {HttpClient} from '@angular/common/http';
import {MEDIA_LIST_QUERY, MEDIA_QUERY} from '../misc/query';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  constructor(private apollo: Apollo, private http: HttpClient) { }

  getMultipleMedia(search?: string): Observable<{ Page: { media: Media[], pageInfo: PageInfo }}> {
    return this.apollo.query({
      query: MEDIA_LIST_QUERY,
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
      query: MEDIA_QUERY,
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
