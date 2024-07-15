import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {ActivatedRoute} from '@angular/router';
import {GraphqlService} from '../../services/graphql.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatButton
  ],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent implements OnInit{
  post: any;

  constructor(
    private route: ActivatedRoute,
    private graphqlService: GraphqlService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    const postId = this.route.snapshot.paramMap.get('id');
    this.graphqlService.getPost(1).subscribe((result: any) => {
      this.post = result.data.post;
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
