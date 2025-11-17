import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Vendor, VendorDetail } from '../models/vendor.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private http = inject(HttpClient);

  getVendors(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(`${environment.apiUrl}/api/vendors`);
  }

  getVendorById(id: string): Observable<VendorDetail> {
    return this.http.get<VendorDetail>(`${environment.apiUrl}/api/vendors/${id}`);
  }

  searchVendors(query: string): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(`${environment.apiUrl}/api/vendors/search`, {
      params: { q: query }
    });
  }
}
