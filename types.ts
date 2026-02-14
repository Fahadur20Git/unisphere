
export enum UserRole {
  PROSPECTIVE = 'PROSPECTIVE',
  CURRENT = 'CURRENT'
}

export interface University {
  id: string;
  name: string;
  country: string;
  avgFees: number;
  avgPlacement: number;
  worldRanking: number;
  tags: string[];
  description: string;
  costOfLiving: 'Low' | 'Medium' | 'High';
  image: string;
  galleryImages?: string[];
  officialWebsite?: string;
  courses?: string[];
  entranceExams?: string[];
  scholarships?: string[];
  languagesNeeded?: string[];
  professorHighlights?: string[];
}

export interface CoursePopularity {
  name: string;
  percentage: number;
  growth: string;
}

export interface GlobalTrend {
  country: string;
  studentCount: number;
  popularCourse: string;
}

export interface StudentReview {
  id: string;
  universityId: string;
  studentName: string;
  role: string;
  comment: string;
  rating: number;
  sentiment?: 'Positive' | 'Neutral' | 'Negative';
  isVerified: boolean;
  credibilityScore: number;
}

export interface UserProfile {
  email: string;
  role: UserRole;
  dob?: string;
  educationLevel?: 'School' | 'College';
  currentCollegeName?: string;
  currentBatch?: string;
  targetMasterDegree?: string;
  studentId?: string;
  universityBatch?: string;
  verificationDocUrl?: string;
  gpa: number;
  budget: number;
  careerGoals: string;
  preferredCountries: string[];
  skills: string[];
}

export interface RecommendationResult {
  university: University;
  score: number;
  reasons: string[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
}
