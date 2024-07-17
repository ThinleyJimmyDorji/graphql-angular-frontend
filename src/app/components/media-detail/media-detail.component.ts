import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {ActivatedRoute} from '@angular/router';
import {GraphqlService} from '../../services/graphql.service';
import {MatDialog} from '@angular/material/dialog';
import {NgForOf, NgIf, TitleCasePipe} from '@angular/common';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatProgressBar} from '@angular/material/progress-bar';
import {Media} from '../../../generated/graphql';

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
    TitleCasePipe
  ],
  templateUrl: './media-detail.component.html',
  styleUrl: './media-detail.component.scss'
})
export class MediaDetailComponent implements OnInit{
  media!: Media;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private graphqlService: GraphqlService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    const mediaID = this.route.snapshot.paramMap.get('id');
    this.loading = true;
    this.graphqlService.getMediaByID(Number(mediaID) || 1).subscribe((media) => {
      this.media = media;
      this.loading = false;
    });
  }

  openEditPostDialog() {
    // Implement dialog logic
  }


  openEditCommentDialog(comment: any) {
    // Implement dialog logic
  }

}
