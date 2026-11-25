import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../core/user.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-users', standalone: true, imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './users.component.html', styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm = '';
  selectedStatus = 'All statuses';
  sortColumn = 'firstName';
  sortDirection = 'asc';
  loading = false;
  editingUser: any = null;
  message = '';
  constructor(private userService: UserService) {}
  ngOnInit() {
    this.loadUsers();
  }
  loadUsers() {
    this.loading = true;
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.applyFilters();
      this.loading = false;
    });
  }
  onSearch(value: string) {
    this.searchTerm = value;
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.applyFilters();
    });
  }
  applyFilters() {
    const result = _.filter(this.users, user => {
      const text = (user.firstName + ' ' + user.lastName + ' ' + user.email).toLowerCase();
      const matchesSearch = text.includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.selectedStatus === 'All statuses' || user.status === this.selectedStatus;
      return matchesSearch && matchesStatus;
    });
    this.filteredUsers = _.orderBy(result, [this.sortColumn], [this.sortDirection as 'asc' | 'desc']);
  }
  sortBy(column: string) {
    if (this.sortColumn === column) this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    else { this.sortColumn = column; this.sortDirection = 'asc'; }
    this.applyFilters();
  }
  statusChanged() { this.applyFilters(); }
  openEditor(user: any) {
    this.editingUser = {...user};
    document.querySelector('.edit-panel')?.classList.add('visible');
  }
  closeEditor() {
    document.querySelector('.edit-panel')?.classList.remove('visible');
    this.editingUser = null;
  }
  saveUser() {
    this.userService.updateUser(this.editingUser).subscribe(result => {
      const index = this.users.findIndex(u => u.id === result.id);
      this.users[index] = result;
      this.applyFilters();
      this.message = 'User updated successfully';
      this.closeEditor();
    });
  }
  getInitials(user: any) { return user.firstName[0] + user.lastName[0]; }
}
