/* Sync all changes */

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { VendorService } from '../../services/vendor.service';
import { VendorDetail } from '../../models/vendor.model';

@Component({
  selector: 'app-vendor-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css']
})
export class VendorDetailComponent implements OnInit {
  private vendorService = inject(VendorService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  vendor: VendorDetail | null = null;
  loading = false;
  activeTab: 'photos' | 'videos' | 'albums' = 'photos';

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.loadVendorDetail(params['id']);
      }
    });
  }

  loadVendorDetail(id: string): void {
    this.loading = true;
    this.vendorService.getVendorById(id).subscribe({
      next: (data) => {
        this.vendor = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/vendors']);
  }

  selectTab(tab: 'photos' | 'videos' | 'albums'): void {
    this.activeTab = tab;
  }
}
