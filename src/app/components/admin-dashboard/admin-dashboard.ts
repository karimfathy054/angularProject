import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users-service';
import { IUser } from '../../models/iuser';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit {
  users: IUser[] = [];

  // For the add/edit form
  showForm = false;
  isEditing = false;
  currentUser: IUser = this.getEmptyUser();

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.users = this.usersService.getAllUsers();
  }

  getEmptyUser(): IUser {
    return { id: 0, firstName: '', lastName: '', email: '', password: '', role: 'user' };
  }

  // Show form for adding a new user
  openAddForm() {
    this.isEditing = false;
    this.currentUser = this.getEmptyUser();
    // Auto-generate an ID
    this.currentUser.id = this.users.length > 0 ? Math.max(...this.users.map((u) => u.id)) + 1 : 1;
    this.showForm = true;
  }

  // Show form for editing an existing user
  openEditForm(user: IUser) {
    this.isEditing = true;
    this.currentUser = { ...user }; // clone to avoid mutating the original
    this.showForm = true;
  }

  // Save (handles both add and update)
  saveUser() {
    if (this.isEditing) {
      this.usersService.updateUser(this.currentUser);
    } else {
      this.usersService.addUser(this.currentUser);
    }
    this.loadUsers();
    this.cancelForm();
  }

  // Delete a user
  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.usersService.deleteUser(id);
      this.loadUsers();
    }
  }

  cancelForm() {
    this.showForm = false;
    this.currentUser = this.getEmptyUser();
  }
}
