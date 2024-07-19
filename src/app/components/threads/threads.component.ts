import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GraphqlService} from '../../services/graphql.service';
import {MatDialog} from '@angular/material/dialog';
import {LikeableType, Thread, ThreadComment} from '../../../generated/graphql';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';
import {MatProgressBar} from '@angular/material/progress-bar';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {of, switchMap} from 'rxjs';

@Component({
  selector: 'app-threads',
  standalone: true,
  imports: [
    JsonPipe,
    NgIf,
    MatProgressBar,
    NgForOf,
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule
  ],
  templateUrl: './threads.component.html',
  styleUrl: './threads.component.scss'
})
export class ThreadsComponent implements OnInit{
  thread!: Thread;
  commentControl = new FormControl('');
  threadComments!: ThreadComment[];
  showCommentInput = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private graphqlService: GraphqlService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getThread();
  }

  getThread(): void {
    const threadId = this.route.snapshot.paramMap.get('id');
    this.graphqlService.getThread(Number(threadId)).toPromise().then((thread) => {
      this.thread = thread as Thread;
      this.getThreadComments();
    });
  }

  /*getThreadComments(): void {
    this.graphqlService.getThreadComments(this.thread?.id).subscribe((comments) => {
      this.threadComments = comments.Page.threadComments;
    });
  }*/

  getThreadComments(): void {
    this.graphqlService.getThreadComments(this.thread?.id);
  }

  addALike(): void {
    this.graphqlService.toggleLike(this.thread?.id, LikeableType.Thread).pipe(switchMap(() => {
      this.getThread();
      return of(null);
    })).subscribe();
  }

  likeAThreadComment(threadComment: ThreadComment): void {
    this.graphqlService.toggleLike(threadComment.id, LikeableType.ThreadComment).pipe(switchMap(() => {
      this.getThreadComments();
      return of(null);
    })).subscribe();
  }

  addAComment(): void {
    //TODO
  }
}
