/* Sync all changes */
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VendorService } from '../../services/vendor.service';
import { Vendor } from '../../models/vendor.model';

@Component({
  selector: 'app-vendor-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {
  private vendorService = inject(VendorService);
  private router = inject(Router);

  vendors: Vendor[] = [];
  loading = false;
  searchQuery = '';

  ngOnInit(): void {
    this.loadVendors();
  }

  loadVendors(): void {
    this.loading = true;
    this.vendorService.getVendors().subscribe({
      next: (data) => {
        this.vendors = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.loading = true;
      this.vendorService.searchVendors(this.searchQuery).subscribe({
        next: (data) => {
          this.vendors = data;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    } else {
      this.loadVendors();
    }
  }

  selectVendor(vendor: Vendor): void {
    this.router.navigate(['/vendors', vendor.id]);
  }
}
