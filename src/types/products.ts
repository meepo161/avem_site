export interface Subcategory {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

export interface Document {
  id: string;
  title: string;
  url: string;
  type: 'passport' | 'manual' | 'certificate' | 'verification';
}

export interface Product {
  id: number;
  name: string;
  description: string;
  images: string[];
  categoryId: string;
  subcategoryId: string | null;
  specifications?: Record<string, string>;
  documents?: Document[];
} 