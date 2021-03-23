import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/core/services/account.service';

import { items } from './items.constant';
import { MenuItem } from './menu-item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  items: Array<MenuItem> = items;
  constructor(private router: Router, private accountService: AccountService) {}

  logout(): void {
    this.accountService.logout();
    this.router.navigate(['/']);
  }

}
