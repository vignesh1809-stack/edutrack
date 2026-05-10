package com.example.edutrack.entity.enums;

public enum InstitutionLevel {

    SECONDARY("Secondary School (Grade 10)"),
    HIGHER_SECONDARY("Higher Secondary School (Grade 11–12)"),
    UNDERGRADUATE("Undergraduate (Bachelor's Degree)"),
    POSTGRADUATE("Postgraduate (Master's Degree)"),
    SCHOOL("General School"),
    COLLEGE("General College"),
    UNIVERSITY("University");

    private final String displayName;

    InstitutionLevel(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
