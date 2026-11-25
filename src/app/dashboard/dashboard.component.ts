import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../core/user.service';
@Component({
  selector: 'app-dashboard', standalone: true, imports: [CommonModule],
  templateUrl: './dashboard.component.html', styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  users: any[] = [];
  activeUsers: any[] = [];
  departmentCount = 0;
  loading = true;
  errorMessage = '';
  constructor(private userService: UserService) {}
  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.activeUsers = this.users.filter(user => user.status === 'Active');
      this.departmentCount = new Set(this.users.map(user => user.department)).size;
      this.loading = false;
    }, error => {
      this.errorMessage = error;
      this.loading = false;
    });
  }
  getPercentage(value: number) {
    return Math.round((value / this.users.length) * 100);
  }
  getDepartmentUsers(department: string) {
    return this.users.filter(user => user.department === department).length;
  }
  get departments() {
    return [...new Set(this.users.map(user => user.department))];
  }
  get pendingInvites() {
    return this.users.filter(user => user.status === 'Invited').length;
  }
}
