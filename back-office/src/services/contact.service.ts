import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../models/index.model';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class ContactService {
    protected baseUrl = environment.apiUrl+'/contact';
    private http = inject(HttpClient);
    constructor() {}

    getAll(): Observable<{data: { contacts: Contact[]} }> {
        return this.http.get<{data: { contacts: Contact[]}}>(this.baseUrl);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
