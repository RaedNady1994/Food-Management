import { AuthService } from 'src/app/auth/services/auth.service';
import { Component } from '@angular/core';
import { NavItem } from './NavItem';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  navItems!: NavItem[];
  private role: string = '';
  constructor(authService: AuthService) {
    this.role = authService.getRole();
    this.initiateSideBar();
  }

  private initiateSideBar() {
    this.navItems = [
      {
        path: '/dashboard/home',
        icon: 'fa-solid fa-home',
        label: 'Home',
        isVisible: true,
      },
      {
        path: 'admin/users',
        icon: 'fa-solid fa-users',
        label: 'Users',
        isVisible: this.isAdmin(),
      },
      {
        path: 'admin/recipes',
        icon: 'fa-solid fa-utensils',
        label: 'Recipe',
        isVisible: this.isAdmin(),
      },
      {
        path: 'admin/categories',
        icon: 'fa-solid fa-list',
        label: 'Categories',
        isVisible: this.isAdmin(),
      },
      {
        path: 'user/user-recipe',
        icon: 'fa-solid fa-utensils',
        label: 'Recipe',
        isVisible: this.isUser(),
      },
      {
        path: 'user/favorite',
        icon: 'fa-solid fa-heart',
        label: 'Favorite',
        isVisible: this.isUser(),
      },
    ];
  }

  private isAdmin(): boolean {
    return this.role === 'SuperAdmin';
  }
  private isUser(): boolean {
    return this.role === 'SystemUser';
  }
}
