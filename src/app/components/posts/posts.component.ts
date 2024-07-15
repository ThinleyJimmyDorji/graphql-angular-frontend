import {Component, OnInit} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {GraphqlService} from '../../services/graphql.service';
import {MatDialog} from '@angular/material/dialog';
import {NgForOf, NgIf, TitleCasePipe} from '@angular/common';
import {Post} from '../../../generated/graphql';
import {ActivatedRoute, Router} from '@angular/router';
import {MatProgressBar} from '@angular/material/progress-bar';
import {MatIcon} from '@angular/material/icon';

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
    NgForOf,
    MatProgressBar,
    NgIf,
    TitleCasePipe,
    MatIcon
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit{
  posts: Post[] = [];
  loading = false;

  constructor(private graphqlService: GraphqlService, public dialog: MatDialog, protected router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.loading = true;
    this.graphqlService.getPosts().subscribe((result: any) => {
      this.posts = result.data.posts.data;
      this.loading = false;
    });
  }

  routeToPostDetail(post: Post): void {
    this.router.navigate([post.id], {relativeTo: this.activatedRoute });
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

  protected readonly event = event;
}
