
package com.unisphere.model;

import lombok.Data;
import java.util.List;

@Data
public class UniversityDeepDive {
    private String officialWebsite;
    private String infrastructure;
    private List<String> departments;
    private List<ExamRequirement> entranceExams;
    private List<ScholarshipOption> scholarships;
    private List<String> languageRequirements;
    private List<String> professorHighlights;

    @Data
    public static class ExamRequirement {
        private String name;
        private String details;
        private String applicationLink;
    }

    @Data
    public static class ScholarshipOption {
        private String title;
        private String eligibility;
        private String link;
    }
}
