import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../core/user.service';

@Component({
  selector: 'app-user-detail', standalone: true, imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './user-detail.component.html', styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {
  user: any;
  loading = true;
  error = '';
  editing = false;
  profileForm: FormGroup;

  constructor(private route: ActivatedRoute, private userService: UserService, private sanitizer: DomSanitizer, private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      role: ['', Validators.required],
      bio: ['']
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userService.getUsers().subscribe(users => {
        this.userService.getUser(Number(params['id'])).subscribe(user => {
          this.user = user;
          this.profileForm.patchValue({ role: user?.role || '', bio: user?.bio || '' });
          this.loading = false;
        });
      });
    });
  }

  get trustedBio() {
    return this.sanitizer.bypassSecurityTrustHtml(this.user?.bio || '');
  }

  save() {
    this.userService.updateUser({ ...this.user, ...this.profileForm.value }).subscribe(user => {
      this.user = user;
      this.editing = false;
    });
  }
}
