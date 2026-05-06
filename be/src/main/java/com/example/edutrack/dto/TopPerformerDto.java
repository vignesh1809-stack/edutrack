package com.example.edutrack.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TopPerformerDto {
    private String name;
    private String meta; // e.g. "CSE • 98.4%"
    private String image;
    private String rank; // e.g. "1st"
}
