package com.example.edutrack.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentPortalProfileDto {
    private HeaderInfo header;
    private PersonalInfo personal;
    private ContactInfo contact;
    private SchoolInfo school;
    private GuardianInfo guardian;

    @Data
    @Builder
    public static class HeaderInfo {
        private String fullName;
        private String gradeSection;
        private String location;
        private String avatarUrl;
    }

    @Data
    @Builder
    public static class PersonalInfo {
        private LocalDate dateOfBirth;
        private String gender;
        private String bloodGroup;
        private String nationality;
    }

    @Data
    @Builder
    public static class ContactInfo {
        private String primaryPhone;
        private String emailAddress;
        private String residentialAddress;
    }

    @Data
    @Builder
    public static class SchoolInfo {
        private String studentId;
        private String departmentName;
        private Integer enrollmentYear;
        private String currentLevel;
    }

    @Data
    @Builder
    public static class GuardianInfo {
        private String name;
        private String relation;
        private String phone;
        private String occupation;
    }
}
