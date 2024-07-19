import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {ActivatedRoute, Router} from '@angular/router';
import {GraphqlService} from '../../services/graphql.service';
import {MatDialog} from '@angular/material/dialog';
import {JsonPipe, NgForOf, NgIf, TitleCasePipe} from '@angular/common';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatProgressBar} from '@angular/material/progress-bar';
import {Media, Thread} from '../../../generated/graphql';

@Component({
  selector: 'app-media-detail',
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
    TitleCasePipe,
    JsonPipe
  ],
  templateUrl: './media-detail.component.html',
  styleUrl: './media-detail.component.scss'
})
export class MediaDetailComponent implements OnInit{
  media!: Media;
  threads!: Thread[];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private graphqlService: GraphqlService,
    public dialog: MatDialog
  ) {}

  getThreads(): void {
    this.graphqlService.getThreads().subscribe((threads) => {
      this.threads = threads.Page.threads;
    });
  }

  ngOnInit() {
    const mediaID = this.route.snapshot.paramMap.get('id');
    this.loading = true;
    this.graphqlService.getMediaByID(Number(mediaID) || 1).subscribe((media) => {
      this.media = media;
      this.loading = false;
    });
    this.getThreads();
  }

  routeToThreadsComponent(thread: Thread) {
    this.router.navigate(['anime/thread/', thread.id]);
  }

  toggleFavorite() {
    // Implement toggle logic
  }
}
