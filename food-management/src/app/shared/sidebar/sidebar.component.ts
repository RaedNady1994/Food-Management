import { AuthService } from 'src/app/auth/services/auth.service';
import { Component } from '@angular/core';
import { NavItem } from './NavItem';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  private role: string = '';
  constructor(authService: AuthService) {
    this.role = authService.getRole();
  }

  navItems: NavItem[] = [
    {
      path: '/dashboard',
      icon: 'fa-solid fa-home',
      label: 'Home',
      isActive: this.isAdmin(),
    },
    {
      path: '/users',
      icon: 'fa-solid fa-users',
      label: 'Users',
      isActive: this.isAdmin(),
    },
    {
      path: '/recipes',
      icon: 'fa-solid fa-utensils',
      label: 'Recipe',
      isActive: this.isAdmin(),
    },
    {
      path: '/categories',
      icon: 'fa-solid fa-list',
      label: 'Categories',
      isActive: this.isAdmin(),
    },
  ];

  private isAdmin(): boolean {
    return this.role === 'SuperAdmin';
  }
  private isUser(): boolean {
    return this.role === 'SystemUser';
  }
}


