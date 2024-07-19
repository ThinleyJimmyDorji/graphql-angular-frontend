import { Injectable } from '@angular/core';
import { Apollo, gql} from 'apollo-angular';
import {map, Observable, tap} from 'rxjs';
import {LikeableType, Media, Page, PageInfo, Thread} from '../../generated/graphql';
import {HttpClient} from '@angular/common/http';
import {MEDIA_LIST_QUERY, MEDIA_QUERY, THREAD_COMMENT_LIST_QUERY, THREAD_LIST_QUERY, THREAD_QUERY} from '../misc/query';
import {TOGGLE_FAVORITE_MUTATION, TOGGLE_LIKE} from '../misc/mutation';

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

  getThreadComments(threadId: number, skip?: boolean): Observable<{ Page: { threadComments: Thread[], pageInfo: PageInfo }}>{
    return this.apollo.query({
      query: THREAD_COMMENT_LIST_QUERY,
      variables: {
        threadId
      },
      fetchPolicy: 'no-cache'
    }).pipe(map(response => response.data)) as Observable<{ Page: { threadComments: Thread[], pageInfo: PageInfo }}>

    // @ts-ignore
    /*this.apollo.watchQuery({
      query: THREAD_COMMENT_LIST_QUERY,
      variables: {
        threadId
      },
      pollInterval: 500,
      skipPollAttempt:  () => skip || false,
      fetchPolicy: 'no-cache'
    }).valueChanges.pipe(tap((res) => console.log(res))).subscribe();*/
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

  toggleLike(id: number, type: LikeableType) {
    return this.apollo.mutate({
      mutation: TOGGLE_LIKE,
      variables: {id, type},
      fetchPolicy: 'no-cache'
    })
  }
}
