import {Component, OnInit} from '@angular/core';
import {MatAnchor} from '@angular/material/button';
import {ActivatedRoute, Route, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatAnchor
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}


  ngOnInit(): void {
    this.activatedRoute.fragment.subscribe(fragment => {
      // @ts-ignore
      const params = new URLSearchParams(fragment);
      const token = params.get('access_token');

      if (token) {
        localStorage.setItem('access_token', token);
        this.router.navigate(['anime'])
      }
    });
  }
}
