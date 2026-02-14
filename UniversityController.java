
package com.unisphere.controller;

import com.unisphere.model.*;
import com.unisphere.service.UniversityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/universities")
@CrossOrigin(origins = "*")
public class UniversityController {

    @Autowired
    private UniversityService universityService;

    /**
     * Get tailored university recommendations based on student profile.
     */
    @PostMapping("/recommendations")
    public ResponseEntity<List<RecommendationResult>> getRecommendations(@RequestBody UserProfile profile) {
        return ResponseEntity.ok(universityService.calculateMatches(profile));
    }

    /**
     * Fetch deep-dive AI analysis for a specific university.
     */
    @GetMapping("/{id}/deep-dive")
    public ResponseEntity<UniversityDeepDive> getDeepDive(@PathVariable String id) {
        return ResponseEntity.ok(universityService.getAIDeepDive(id));
    }

    /**
     * Verify student identity via ID upload.
     */
    @PostMapping("/verify-student")
    public ResponseEntity<VerificationResponse> verifyStudent(
            @RequestParam("studentId") String studentId,
            @RequestParam("batch") String batch,
            @RequestParam("file") MultipartFile file) {
        
        // Logical check for batch expiration (e.g. 2023-2027)
        if (universityService.isBatchExpired(batch)) {
            return ResponseEntity.badRequest().body(new VerificationResponse("Graduated students cannot register as mentors."));
        }

        return ResponseEntity.ok(universityService.processVerification(studentId, batch, file));
    }
}
