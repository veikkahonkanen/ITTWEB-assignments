import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {AuthService} from "../../core/auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this._authService.onLoggedInOut$;
  }

  logout() {
    this._authService.logout();
  }

}
