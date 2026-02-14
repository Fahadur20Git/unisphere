
import { University, StudentReview } from './types';

export const UNIVERSITIES: University[] = [
  {
    id: 'u1',
    name: 'Stanford University',
    country: 'USA',
    avgFees: 55000,
    avgPlacement: 96,
    worldRanking: 3,
    tags: ['Tech', 'Entrepreneurship', 'AI', 'Research'],
    description: 'A global leader in research and innovation, located in Silicon Valley.',
    costOfLiving: 'High',
    image: 'https://picsum.photos/seed/stanford/800/400'
  },
  {
    id: 'u2',
    name: 'University of Oxford',
    country: 'UK',
    avgFees: 45000,
    avgPlacement: 92,
    worldRanking: 1,
    tags: ['Traditional', 'Medicine', 'Law', 'Humanities'],
    description: 'The oldest university in the English-speaking world, offering premier academic excellence.',
    costOfLiving: 'High',
    image: 'https://picsum.photos/seed/oxford/800/400'
  },
  {
    id: 'u3',
    name: 'TUM - Technical University of Munich',
    country: 'Germany',
    avgFees: 500,
    avgPlacement: 89,
    worldRanking: 49,
    tags: ['Engineering', 'Automotive', 'Robotics', 'Low Tuition'],
    description: 'One of Europes top-ranked technical universities with strong industry ties.',
    costOfLiving: 'Medium',
    image: 'https://picsum.photos/seed/tum/800/400'
  },
  {
    id: 'u4',
    name: 'National University of Singapore (NUS)',
    country: 'Singapore',
    avgFees: 30000,
    avgPlacement: 94,
    worldRanking: 8,
    tags: ['Business', 'Logistics', 'Finance', 'Asian Hub'],
    description: 'Singapores flagship university, consistently ranked among the top in Asia.',
    costOfLiving: 'High',
    image: 'https://picsum.photos/seed/nus/800/400'
  },
  {
    id: 'u5',
    name: 'University of Toronto',
    country: 'Canada',
    avgFees: 40000,
    avgPlacement: 88,
    worldRanking: 21,
    tags: ['Multicultural', 'CS', 'Biotech', 'Immigration-friendly'],
    description: 'Canadas top research university with a global outlook and diverse campus.',
    costOfLiving: 'Medium',
    image: 'https://picsum.photos/seed/toronto/800/400'
  }
];

export const MOCK_REVIEWS: StudentReview[] = [
  {
    id: 'r1',
    universityId: 'u1',
    studentName: 'Alex Chen',
    role: 'CS Grad Student',
    comment: 'Incredible network here! The placement opportunities in Silicon Valley are unmatched. Expensive but worth it.',
    rating: 5,
    sentiment: 'Positive',
    isVerified: true,
    credibilityScore: 98
  },
  {
    id: 'r2',
    universityId: 'u3',
    studentName: 'Lukas Meyer',
    role: 'Automotive Engineering',
    comment: 'TUM is great for industry projects. Living in Munich is pricey but the quality of education for almost no tuition is insane.',
    rating: 4,
    sentiment: 'Positive',
    isVerified: true,
    credibilityScore: 95
  },
  {
    id: 'r3',
    universityId: 'u2',
    studentName: 'Sarah Jenkins',
    role: 'Philosophy Junior',
    comment: 'The tutorial system is intense. Very traditional vibes. Sometimes feels a bit disconnected from modern industry.',
    rating: 3,
    sentiment: 'Neutral',
    isVerified: false,
    credibilityScore: 65
  }
];
