import { Injectable } from '@angular/core';
import { Apollo, gql} from 'apollo-angular';
import {map, Observable} from 'rxjs';
import {Media, Page, PageInfo, Thread} from '../../generated/graphql';
import {HttpClient} from '@angular/common/http';
import {MEDIA_LIST_QUERY, MEDIA_QUERY, THREAD_COMMENT_LIST_QUERY, THREAD_LIST_QUERY, THREAD_QUERY} from '../misc/query';
import {TOGGLE_FAVORITE_MUTATION} from '../misc/mutation';

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
        id,
        perPage: 18
      },
      fetchPolicy: 'no-cache'
    }).pipe(map(response => response.data['Media'])) as Observable<Media>
  }

  getThreads(): Observable<{ Page: { threads: Thread[], pageInfo: PageInfo }}> {
    return this.apollo.query({
      query: THREAD_LIST_QUERY,
      variables: {
        perPage: 3
      },
      fetchPolicy: 'no-cache'
    }).pipe(map(response => response.data)) as Observable<{ Page: { threads: Thread[], pageInfo: PageInfo }}>
  }

  getThreadComments(threadId: number): Observable<{ Page: { threadComments: Thread[], pageInfo: PageInfo }}> {
    return this.apollo.query({
      query: THREAD_COMMENT_LIST_QUERY,
      variables: {
        threadId: 3
      },
      fetchPolicy: 'no-cache'
    }).pipe(map(response => response.data)) as Observable<{ Page: { threadComments: Thread[], pageInfo: PageInfo }}>
  }

  getThread(threadId: number): Observable<Thread> {
    return this.apollo.query({
      query: THREAD_QUERY,
      variables: {
        id: threadId
      },
      fetchPolicy: 'no-cache'
    }).pipe(map(response => response.data['Thread'])) as Observable<Thread>
  }

  toggleFavorite(animeId: number): Observable<any> {
    return this.apollo.mutate({
      mutation: TOGGLE_FAVORITE_MUTATION,
      variables: {  animeId },
      fetchPolicy: 'no-cache'
    }).pipe(map((response) => response.data))
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
