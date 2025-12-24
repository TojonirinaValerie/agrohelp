import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../../models/index.model';
import { ContactService } from '../../services/contact.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-contact-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule, MatMenuModule, MatIconModule, RouterLink],
  templateUrl: 'contact-dashboard.component.html',
  styleUrls: ['contact-dashboard.component.css']
})
export class ContactDashboardComponent {
  contacts: Contact[] = [];
  displayedColumns: string[] = ['name', 'email', 'phone', 'subject', 'message', 'actions'];

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts() {
    this.contactService.getAll().subscribe((res) => {
      this.contacts = res.data.contacts;
    });
  }

  deleteContact(id: string) {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactService.delete(id).subscribe(() => this.loadContacts());
    }
  }
}