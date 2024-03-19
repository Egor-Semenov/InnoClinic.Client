import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  isLoggedIn!: boolean;

  ngOnInit(): void {
    const token = this.getToken();
    this.isLoggedIn = token !== '';
  }

  getToken(): string {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'AccessToken') {
        return value;
      }
    }
    return '';
  }
}
