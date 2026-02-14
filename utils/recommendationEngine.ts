
import { University, UserProfile, RecommendationResult } from '../types';
import { UNIVERSITIES } from '../constants';

export const getUniversityRecommendations = (profile: UserProfile): RecommendationResult[] => {
  const results = UNIVERSITIES.map(uni => {
    let score = 0;
    const reasons: string[] = [];

    // 1. Budget Alignment (Weight: 25%)
    if (uni.avgFees <= profile.budget) {
      score += 25;
      reasons.push(`Well within your annual budget of $${profile.budget.toLocaleString()}`);
    } else if (uni.avgFees <= profile.budget * 1.3) {
      score += 15;
      reasons.push(`Slightly above budget, but might offer financial aid`);
    }

    // 2. Location Preference (Weight: 20%)
    if (profile.preferredCountries.includes(uni.country)) {
      score += 20;
      reasons.push(`Located in ${uni.country}, one of your preferred study destinations`);
    }

    // 3. Skill/Tag Match (Weight: 30%)
    const matchingTags = uni.tags.filter(tag => 
      profile.skills.some(skill => skill.toLowerCase().includes(tag.toLowerCase())) ||
      profile.careerGoals.toLowerCase().includes(tag.toLowerCase())
    );
    const tagMatchScore = Math.min((matchingTags.length / 2) * 30, 30);
    score += tagMatchScore;
    if (matchingTags.length > 0) {
      reasons.push(`Strong curriculum alignment with focus on ${matchingTags.join(', ')}`);
    }

    // 4. World Ranking (Weight: 10%)
    const rankScore = Math.max(0, 10 - (uni.worldRanking / 50));
    score += rankScore;

    // 5. Placement Strength (Weight: 15%)
    const placementScore = (uni.avgPlacement / 100) * 15;
    score += placementScore;
    if (uni.avgPlacement > 90) {
      reasons.push(`Outstanding placement rate of ${uni.avgPlacement}%`);
    }

    return {
      university: uni,
      score: Math.min(Math.round(score), 100),
      reasons
    };
  });

  return results.sort((a, b) => b.score - a.score);
};
