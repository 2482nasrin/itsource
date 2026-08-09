export interface CategoryProduct {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  saveAmount?: number;
  specs?: string[];
  inStock: boolean;
}

export interface FilterState {
  priceMin: number;
  priceMax: number;
  processor: string[];
  ram: string[];
  ssd: string[];
  graphics: string[];
}