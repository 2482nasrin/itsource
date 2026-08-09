export interface Banner {
  id: number;
  title: string;
  image: string;
  link: string;
}

export const promoBannersData: Banner[] = [
  {
    id: 1,
    title: '40Gbps Mac mini M4 Dock',
    image: '/images/banners/mac-mini-dock.jpg',
    link: '/category/macbook-accessories',
  },
  {
    id: 2,
    title: 'HP USB-C Dock G5',
    image: '/images/banners/hp-dock.jpg',
    link: '/category/usb-hub',
  },
];