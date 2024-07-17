import {Component, OnInit} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatAnchor, MatButton} from '@angular/material/button';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {GraphqlService} from '../../services/graphql.service';
import {MatDialog} from '@angular/material/dialog';
import {NgForOf, NgIf, NgOptimizedImage, TitleCasePipe} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {MatProgressBar} from '@angular/material/progress-bar';
import {MatIcon} from '@angular/material/icon';
import {SearchAnimeModalComponent} from '../search-anime-modal/search-anime.modal.component';
import {Media, User} from '../../../generated/graphql';

@Component({
  selector: 'app-media',
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
    MatIcon,
    NgOptimizedImage,
    MatAnchor
  ],
  templateUrl: './media-list.component.html',
  styleUrl: './media-list.component.scss'
})
export class MediaListComponent implements OnInit{
  animeMedia: {media: Media[]} = {media: []};
  loading = false;

  constructor(private graphqlService: GraphqlService, public dialog: MatDialog, protected router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.fragment.subscribe(fragment => {
      // @ts-ignore
      const params = new URLSearchParams(fragment);
      const token = params.get('access_token');

      if (token) {
        localStorage.setItem('access_token', token);
      }
    });

    this.loading = true;
    this.graphqlService.getMultipleMedia().subscribe((result) => {
      this.animeMedia = {media: result.Page.media as Media[]};
      this.loading = false;
    });
  }

  toggleFollow = () => this.graphqlService.toggleFollow(1).subscribe();
  routeToPostDetail(post: any): void {
    this.router.navigate([post.id], {relativeTo: this.activatedRoute });
  }
  openCreatePostDialog() {
    this.dialog.open(SearchAnimeModalComponent, {
      width: '600px',
      data: {
        post: {
          title: 'Dummy title',
          body: 'Dummy body'
        }
      }
    }).afterClosed().subscribe((value: Media) => {
      this.router.navigate([value.id], {relativeTo: this.activatedRoute});
    });
  }
}
