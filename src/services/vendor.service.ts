/* Sync all changes */
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

  private sampleVendors: Vendor[] = [
    {
      id: '1',
      name: 'Green Valley Farms',
      description: 'Fresh organic vegetables sourced directly from our farms',
      image: 'https://images.pexels.com/photos/5737452/pexels-photo-5737452.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Organic Vegetables',
      rating: 4.8,
      reviewCount: 156,
      location: 'Sacramento, CA'
    },
    {
      id: '2',
      name: 'Urban Garden Co',
      description: 'Locally grown vegetables from rooftop gardens in the city',
      image: 'https://i.pinimg.com/1200x/e7/6f/86/e76f86a7889232e98e2c6533d11f1c43.jpg?auto=compress&cs=tinysrgb&w=400',
      category: 'Local Produce',
      rating: 4.6,
      reviewCount: 92,
      location: 'Portland, OR'
    },
    {
      id: '3',
      name: 'Farm Fresh Direct',
      description: 'Premium quality vegetables delivered fresh to your door',
      image: 'https://i.pinimg.com/1200x/11/5e/a0/115ea02da338f096915a0371afd3ee8d.jpg?auto=compress&cs=tinysrgb&w=400',
      category: 'Delivery Service',
      rating: 4.7,
      reviewCount: 234,
      location: 'Denver, CO'
    },
    {
      id: '4',
      name: 'Harvest Moon Organics',
      description: 'Certified organic vegetables and sustainable farming practices',
      image: 'https://i.pinimg.com/736x/4a/f5/3e/4af53eca00826ed86081bf35dfea7497.jpg?auto=compress&cs=tinysrgb&w=400',
      category: 'Organic Certified',
      rating: 4.9,
      reviewCount: 187,
      location: 'Austin, TX'
    },
    {
      id: '5',
      name: 'Seasonal Harvest Market',
      description: 'Seasonal vegetables at competitive prices, farm to market',
      image: 'https://images.pexels.com/photos/4440717/pexels-photo-4440717.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Wholesale',
      rating: 4.5,
      reviewCount: 128,
      location: 'Nashville, TN'
    },
    {
      id: '6',
      name: 'Heritage Vegetables',
      description: 'Heirloom and traditional vegetable varieties from heritage seeds',
      image: 'https://images.pexels.com/photos/7662515/pexels-photo-7662515.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Specialty Produce',
      rating: 4.4,
      reviewCount: 71,
      location: 'Burlington, VT'
    },
    {
      id: '7',
      name: 'Sunshine Farms Cooperative',
      description: 'Community-supported agriculture with fresh weekly boxes',
      image: 'https://images.pexels.com/photos/5532537/pexels-photo-5532537.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'CSA Program',
      rating: 4.7,
      reviewCount: 165,
      location: 'Seattle, WA'
    },
    {
      id: '8',
      name: 'Riverside Produce',
      description: 'Traditional farming methods producing premium quality vegetables',
      image: 'https://images.pexels.com/photos/5632639/pexels-photo-5632639.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Premium Grade',
      rating: 4.6,
      reviewCount: 143,
      location: 'Portland, ME'
    }
  ];

  private sampleVendorDetails: { [key: string]: VendorDetail } = {
    '1': {
      id: '1',
      name: 'Green Valley Farms',
      description: 'Fresh organic vegetables sourced directly from our farms',
      image: 'https://images.pexels.com/photos/5737452/pexels-photo-5737452.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Organic Vegetables',
      rating: 4.8,
      reviewCount: 156,
      location: 'Sacramento, CA',
      email: 'info@greenvalleyfarms.com',
      phone: '(916) 555-0101',
      website: 'https://greenvalleyfarms.com',
      about: 'Green Valley Farms has been producing organic vegetables for over 20 years. We use sustainable farming practices and never use synthetic pesticides or fertilizers. Our commitment to quality ensures every vegetable meets the highest standards.',
      services: ['Organic Certification', 'Farmers Market', 'Direct Delivery', 'Bulk Orders'],
      availability: 'Year-round, Tuesday-Sunday 8AM-6PM'
    },
    '2': {
      id: '2',
      name: 'Urban Garden Co',
      description: 'Locally grown vegetables from rooftop gardens in the city',
      image: 'https://i.pinimg.com/1200x/e7/6f/86/e76f86a7889232e98e2c6533d11f1c43.jpg?auto=compress&cs=tinysrgb&w=400',
      category: 'Local Produce',
      rating: 4.6,
      reviewCount: 92,
      location: 'Portland, OR',
      email: 'hello@urbangarden.local',
      phone: '(503) 555-0102',
      website: 'https://urbangarden.local',
      about: 'Urban Garden Co brings fresh produce directly to the city through innovative rooftop farming. We reduce transportation costs and environmental impact while providing the freshest vegetables possible.',
      services: ['Rooftop Farming', 'Weekly CSA', 'Restaurant Supplier', 'Farm Tours'],
      availability: 'Year-round, Monday-Saturday 9AM-7PM'
    },
    '3': {
      id: '3',
      name: 'Farm Fresh Direct',
      description: 'Premium quality vegetables delivered fresh to your door',
      image: 'https://i.pinimg.com/1200x/11/5e/a0/115ea02da338f096915a0371afd3ee8d.jpg?auto=compress&cs=tinysrgb&w=400',
      category: 'Delivery Service',
      rating: 4.7,
      reviewCount: 234,
      location: 'Denver, CO',
      email: 'orders@farmfreshdirect.com',
      phone: '(720) 555-0103',
      website: 'https://farmfreshdirect.com',
      about: 'Farm Fresh Direct specializes in convenient delivery of the freshest vegetables right to your door. Our carefully selected produce is picked at peak ripeness and delivered within 24 hours.',
      services: ['Same-Day Delivery', 'Subscription Boxes', 'Organic Options', 'Dietary Accommodations'],
      availability: 'Daily delivery, 7AM-9PM'
    },
    '4': {
      id: '4',
      name: 'Harvest Moon Organics',
      description: 'Certified organic vegetables and sustainable farming practices',
      image: 'https://i.pinimg.com/736x/4a/f5/3e/4af53eca00826ed86081bf35dfea7497.jpg?auto=compress&cs=tinysrgb&w=400',
      category: 'Organic Certified',
      rating: 4.9,
      reviewCount: 187,
      location: 'Austin, TX',
      email: 'contact@harvestmoon.org',
      phone: '(512) 555-0104',
      website: 'https://harvestmoon.org',
      about: 'Harvest Moon Organics is a certified organic farm committed to regenerative agriculture. We focus on building soil health and biodiversity while producing nutrient-dense vegetables.',
      services: ['USDA Organic Certified', 'Regenerative Farming', 'Educational Workshops', 'Wholesale'],
      availability: 'Wednesday-Sunday 7AM-2PM'
    },
    '5': {
      id: '5',
      name: 'Seasonal Harvest Market',
      description: 'Seasonal vegetables at competitive prices, farm to market',
      image: 'https://images.pexels.com/photos/4440717/pexels-photo-4440717.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Wholesale',
      rating: 4.5,
      reviewCount: 128,
      location: 'Nashville, TN',
      email: 'sales@seasonalharvest.com',
      phone: '(615) 555-0105',
      website: 'https://seasonalharvest.com',
      about: 'Seasonal Harvest Market provides fresh, affordable vegetables for retailers and restaurants. We work with multiple local farms to ensure year-round availability of the best seasonal produce.',
      services: ['Wholesale Pricing', 'Bulk Delivery', 'Consistent Supply', 'Custom Orders'],
      availability: 'Monday-Friday 6AM-4PM'
    },
    '6': {
      id: '6',
      name: 'Heritage Vegetables',
      description: 'Heirloom and traditional vegetable varieties from heritage seeds',
      image: 'https://images.pexels.com/photos/7662515/pexels-photo-7662515.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Specialty Produce',
      rating: 4.4,
      reviewCount: 71,
      location: 'Burlington, VT',
      email: 'info@heritageveg.com',
      phone: '(802) 555-0106',
      website: 'https://heritageveg.com',
      about: 'Heritage Vegetables specializes in rare heirloom varieties that preserve agricultural diversity. Each variety is grown with care to maintain historical characteristics and superior flavor.',
      services: ['Heirloom Varieties', 'Seed Saving', 'Educational Events', 'Restaurant Partnerships'],
      availability: 'Saturday-Sunday 9AM-3PM, plus by appointment'
    },
    '7': {
      id: '7',
      name: 'Sunshine Farms Cooperative',
      description: 'Community-supported agriculture with fresh weekly boxes',
      image: 'https://images.pexels.com/photos/5532537/pexels-photo-5532537.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'CSA Program',
      rating: 4.7,
      reviewCount: 165,
      location: 'Seattle, WA',
      email: 'members@sunshinefarms.coop',
      phone: '(206) 555-0107',
      website: 'https://sunshinefarms.coop',
      about: 'Sunshine Farms Cooperative operates a thriving CSA program connecting members directly with farms. Every week, members receive a box of freshly harvested seasonal vegetables.',
      services: ['CSA Membership', 'Weekly Pickups', 'Farm Volunteer Days', 'Recipe Support'],
      availability: 'Seasonal, May-November'
    },
    '8': {
      id: '8',
      name: 'Riverside Produce',
      description: 'Traditional farming methods producing premium quality vegetables',
      image: 'https://images.pexels.com/photos/5632639/pexels-photo-5632639.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Premium Grade',
      rating: 4.6,
      reviewCount: 143,
      location: 'Portland, ME',
      email: 'contact@riversideproduce.com',
      phone: '(207) 555-0108',
      website: 'https://riversideproduce.com',
      about: 'Riverside Produce honors traditional farming methods passed down through generations. We believe in slow food principles and take pride in every vegetable we grow.',
      services: ['Farm Visits', 'Premium Quality', 'Local Distribution', 'Special Events'],
      availability: 'Year-round, Tuesday-Sunday 8AM-5PM'
    }
  };

  getVendors(): Observable<Vendor[]> {
    return of(this.sampleVendors);
  }

  getVendorById(id: string): Observable<VendorDetail> {
    const detail = this.sampleVendorDetails[id];
    return of(detail);
  }

  searchVendors(query: string): Observable<Vendor[]> {
    const filtered = this.sampleVendors.filter(v =>
      v.name.toLowerCase().includes(query.toLowerCase()) ||
      v.category.toLowerCase().includes(query.toLowerCase()) ||
      v.description.toLowerCase().includes(query.toLowerCase())
    );
    return of(filtered);
  }
}
