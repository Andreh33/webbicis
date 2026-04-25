export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  alt: string | null;
  order: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDesc: string;
  price: number;
  compareAt: number | null;
  currency: string;
  sku: string | null;
  stock: number;
  category: string;
  brand: string | null;
  stripeLink: string;
  featured: boolean;
  active: boolean;
  images: ProductImage[];
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  image: string;
  stripeLink: string;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  role: "CLIENT" | "ADMIN";
  createdAt: string;
}

export interface Address {
  id: string;
  userId: string;
  label: string;
  fullName: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string | null;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId: string | null;
  email: string;
  status: "PENDING" | "PAID" | "FULFILLED" | "CANCELLED";
  total: number;
  items: CartItem[];
  stripeRef: string | null;
  createdAt: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}
