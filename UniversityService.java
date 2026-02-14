
package com.unisphere.service;

import com.unisphere.model.*;
import org.springframework.stereotype.Service;
import java.time.Year;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class UniversityService {

    /**
     * Core Java implementation of the Multi-Factor Similarity Scoring (MFSS) algorithm.
     */
    public List<RecommendationResult> calculateMatches(UserProfile profile) {
        // Fetch all universities from PostgreSQL
        List<University> allUnis = universityRepository.findAll();

        return allUnis.stream()
            .map(uni -> {
                double score = 0;
                List<String> reasons = new ArrayList<>();

                // Financial Weighting (25%)
                if (uni.getAvgFees() <= profile.getBudget()) {
                    score += 25.0;
                    reasons.add("Fits perfectly within budget");
                }

                // Academic Alignment (30%)
                long matchCount = uni.getTags().stream()
                    .filter(tag -> profile.getCareerGoals().toLowerCase().contains(tag.toLowerCase()))
                    .count();
                score += Math.min(matchCount * 10.0, 30.0);

                // Placement Strength (15%)
                score += (uni.getAvgPlacement() / 100.0) * 15.0;

                return new RecommendationResult(uni, (int)score, reasons);
            })
            .sorted(Comparator.comparing(RecommendationResult::getScore).reversed())
            .collect(Collectors.toList());
    }

    /**
     * Batch validation logic to restrict graduated students.
     */
    public boolean isBatchExpired(String batchRange) {
        try {
            String[] years = batchRange.split("-");
            int graduationYear = Integer.parseInt(years[1].trim());
            int currentYear = Year.now().getValue();
            return graduationYear < currentYear;
        } catch (Exception e) {
            return true; // Conservative fail
        }
    }

    /**
     * Orchestrates the call to the Gemini AI API via Java SDK.
     */
    public UniversityDeepDive getAIDeepDive(String universityId) {
        // Logic to build prompt, call Gemini, and parse JSON using Jackson
        // This abstracts the AI complexity from the frontend
        return geminiClient.fetchUniversityReport(universityId);
    }
}
