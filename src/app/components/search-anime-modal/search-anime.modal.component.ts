import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule, MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {GraphqlService} from '../../services/graphql.service';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatOption
} from '@angular/material/autocomplete';
import {AsyncPipe} from '@angular/common';
import {debounceTime, distinctUntilChanged, filter, map, Observable, switchMap, tap} from 'rxjs';
import {Media, PageInfo} from '../../../generated/graphql';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {ActivatedRoute, Route, Router} from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-search-anime-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    MatDialogTitle,
    MatDialogClose,
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatInput,
    MatDialogActions,
    MatButton,
    ReactiveFormsModule,
    MatAutocomplete,
    MatOption,
    MatAutocompleteTrigger,
    AsyncPipe
  ],
  templateUrl: './search-anime.modal.component.html',
  styleUrl: './search-anime.modal.component.scss'
})
export class SearchAnimeModalComponent implements OnInit {
  form = new FormGroup({ search: new FormControl('', [Validators.required]) })
  mediaSearchResults$!: Observable<Media[]>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    post: { title: string, body: string }
  },public dialogRef: MatDialogRef<SearchAnimeModalComponent>, private graphqlService: GraphqlService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.mediaSearchResults$ = this.listenToAnimeMedia();
  }

  listenToAnimeMedia():Observable<Media[]>
  {
    // @ts-ignore
    return this.form.get('search').valueChanges.pipe(
      untilDestroyed(this),
      distinctUntilChanged(),
      // @ts-ignore
      debounceTime(400),
      filter((value: string) => value?.length > 1),
      switchMap((value) => this.graphqlService.getMultipleMedia(this.form.get('search')?.value as string)
      ),
      map((mediaPage: { Page: { media: Media[]; pageInfo: PageInfo; } }) => mediaPage.Page.media)
    );
  }

  routeToAnimeDetail(event: MatAutocompleteSelectedEvent): void {
    this.dialogRef.close(event.option.value);
  }

}
