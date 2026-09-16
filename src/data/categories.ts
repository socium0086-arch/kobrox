import { CategoryItem } from '../types';
import cutterDetailImg from '../assets/images/kobrox_cutter_detail_1784713861967.jpg';
import heroLifestyleImg from '../assets/images/kobrox_hero_lifestyle_1784713850417.jpg';
import craftsmanshipImg from '../assets/images/kobrox_craftsmanship_1784713873281.jpg';

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'cat-cutters',
    key: 'cutters',
    title: 'Cigar Cutters',
    subtitle: 'Precision Engineering & Beveled Blades',
    description: 'Precision cutting tools engineered with 440C surgical stainless steel for a clean, zero-flake guillotine cut.',
    image: cutterDetailImg,
    featuredProductCount: 4
  },
  {
    id: 'cat-lighters',
    key: 'lighters',
    title: 'Cigar Lighters',
    subtitle: 'Windproof Triple Jet Torch & Ignition',
    description: 'High-altitude windproof jet torch flame lighters designed for instant, uniform tobacco foot toast.',
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=80',
    featuredProductCount: 3
  },
  {
    id: 'cat-sets',
    key: 'sets',
    title: 'Cigar Sets',
    subtitle: 'Harmonious Executive Gift Collections',
    description: 'Complete luxury presentation boxes combining precision cutters, jet lighters, and genuine leather cases.',
    image: heroLifestyleImg,
    featuredProductCount: 3
  },
  {
    id: 'cat-accessories',
    key: 'accessories',
    title: 'Cigar Accessories',
    subtitle: 'Ashtrays, Travel Humidors & Accessories',
    description: 'Solid brass and walnut ashtrays, IP67 armor travel humidors, and leather travel pouches for connoisseurs.',
    image: craftsmanshipImg,
    featuredProductCount: 4
  }
];
