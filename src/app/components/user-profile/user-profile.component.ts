import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {GraphqlService} from '../../services/graphql.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatFormField,
    MatCardTitle,
    MatLabel,
    FormsModule,
    MatInput,
    MatButton
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{
  user: any = {};

  constructor(private graphqlService: GraphqlService) {}

  ngOnInit() {
    // Fetch user profile data
  }

  updateUserProfile() {
  }
}
