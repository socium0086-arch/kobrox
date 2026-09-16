import { CraftsmanshipProcess, MaterialInfo } from '../types';
import craftsmanshipImg from '../assets/images/kobrox_craftsmanship_1784713873281.jpg';
import cutterDetailImg from '../assets/images/kobrox_cutter_detail_1784713861967.jpg';

export const CRAFTSMANSHIP_MATERIALS: MaterialInfo[] = [
  {
    name: '440C Martensitic Stainless Steel',
    grade: 'Surgical Grade 58-60 HRC',
    properties: 'High carbon content, extreme edge retention, cryogenic corrosion resistance',
    usedIn: 'Signature Dual Blades & Punch Cutters',
    description: 'Selected for its ability to maintain microscopic razor edges through thousands of shear operations without dulling.',
    image: cutterDetailImg
  },
  {
    name: '6061-T6 Aircraft Aluminum Alloy',
    grade: 'Structural Aerospace Billet',
    properties: 'Exceptional strength-to-weight ratio, structural rigidity, anodization receptive',
    usedIn: 'Cutter Housings & Travel Humidor Shells',
    description: 'Precision milled from solid aluminum blocks to create seamless housing shells with zero flex.',
    image: craftsmanshipImg
  },
  {
    name: 'Architectural Solid Brass & Zinc',
    grade: 'C36000 High-Density Alloy',
    properties: 'Substantial mass, acoustic damping, warm natural patina over decades',
    usedIn: 'Monolith Ashtray Core & Titan Lighter Casing',
    description: 'Provides authoritative weight and anti-tipping stability for executive desk accessories.',
    image: 'https://images.unsplash.com/photo-1511389026070-a14ae610a1be?auto=format&fit=crop&w=1200&q=80'
  }
];

export const CRAFTSMANSHIP_PROCESSES: CraftsmanshipProcess[] = [
  {
    id: 'proc-1',
    stepNumber: '01',
    title: '5-Axis CNC Precision Machining',
    subtitle: 'Micron-Level Architectural Milling',
    description: 'Solid billets of aerospace aluminum and brass are carved on multi-axis Japanese CNC machines under constant coolant mist. Every curvature and bevel is cut to 0.02mm watchmaking tolerances.',
    technicalDetails: [
      'Tolerance precision within +/- 0.02mm',
      'High-speed diamond tipped milling cutters',
      'Real-time laser coordinate measurement'
    ],
    image: craftsmanshipImg,
    badge: 'Machining'
  },
  {
    id: 'proc-2',
    stepNumber: '02',
    title: 'Cryogenic Blade Hardening',
    subtitle: 'Thermal Treatment at -196°C',
    description: 'Blade blanks undergo high-vacuum heat treatment followed by liquid nitrogen immersion (-196°C). This aligns the steel molecular structure for ultimate wear resistance.',
    technicalDetails: [
      'Vacuum heat treatment at 1,050°C',
      'Sub-zero liquid nitrogen soak',
      'Rockwell Hardness rating 58-60 HRC'
    ],
    image: cutterDetailImg,
    badge: 'Metallurgy'
  },
  {
    id: 'proc-3',
    stepNumber: '03',
    title: 'PVD Titanium Electroplating',
    subtitle: 'Scratch-Proof Physical Vapor Deposition',
    description: 'Metal surfaces are coated inside a high-vacuum plasma chamber. Vaporized titanium and champagne gold molecules fuse directly into the substrate surface.',
    technicalDetails: [
      'Ionized plasma coating bonding',
      'Fade-proof & tarnish-free surface layer',
      'Satin brushed & matte gunmetal finishes'
    ],
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=80',
    badge: 'Surface Art'
  },
  {
    id: 'proc-4',
    stepNumber: '04',
    title: 'Hand Assembling & Laser Quality Inspection',
    subtitle: 'Master Craftsman Verification',
    description: 'Every KOBROX accessory is hand-assembled by artisan technicians, lubricated with synthetic watch oils, and subjected to a 12-point quality check before custom gift boxing.',
    technicalDetails: [
      'Smooth action tension hand adjustment',
      'Flame stability & leak testing',
      'Serialized certificate stamping'
    ],
    image: 'https://images.unsplash.com/photo-1527016021513-b09758b777bd?auto=format&fit=crop&w=1200&q=80',
    badge: 'Hand-Assembly'
  }
];
