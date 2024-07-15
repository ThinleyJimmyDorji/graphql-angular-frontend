import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {ActivatedRoute} from '@angular/router';
import {GraphqlService} from '../../services/graphql.service';
import {MatDialog} from '@angular/material/dialog';
import {NgForOf, NgIf, TitleCasePipe} from '@angular/common';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatButton,
    NgForOf,
    MatProgressSpinner,
    MatProgressBar,
    NgIf,
    TitleCasePipe
  ],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent implements OnInit{
  post: any;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private graphqlService: GraphqlService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    const postId = this.route.snapshot.paramMap.get('id');
    this.loading = true;
    this.graphqlService.getPost(Number(postId) || 1).subscribe((result: any) => {
      this.post = result.data.post;
      this.loading = false;
    });
  }

  openEditPostDialog() {
    // Implement dialog logic
  }

  deletePost() {
    this.graphqlService.deletePost(this.post.id).subscribe(() => {
      // Navigate back to posts list
    });
  }

  openEditCommentDialog(comment: any) {
    // Implement dialog logic
  }

  deleteComment(commentId: number) {
    this.graphqlService.deleteComment(commentId).subscribe(() => {
      // this.post.comments = this.post.comments.filter(comment => comment.id !== commentId);
    });
  }

}
