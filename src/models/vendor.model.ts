export interface Vendor {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  location: string;
}

export interface VendorDetail extends Vendor {
  email: string;
  phone: string;
  website: string;
  about: string;
  services: string[];
  availability: string;
}
