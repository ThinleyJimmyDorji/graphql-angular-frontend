import {Component, OnInit} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {GraphqlService} from '../../services/graphql.service';
import {MatDialog} from '@angular/material/dialog';
import {NgForOf} from '@angular/common';
import {Post} from '../../../generated/graphql';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    MatToolbar,
    MatButton,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    NgForOf
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit{
  posts: Post[] = [];

  constructor(private graphqlService: GraphqlService, public dialog: MatDialog) {}

  ngOnInit() {
    this.graphqlService.getPosts().subscribe((result: any) => {
      this.posts = result.data.posts.data;
    });
  }

  openCreatePostDialog() {
    // Implement dialog logic
  }

  openEditPostDialog(post: Post) {
    // Implement dialog logic
  }

  deletePost(id: string) {
    this.graphqlService.deletePost(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
    });
  }

}
