package com.example.edutrack.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PagedResponse<T> {
    private List<T> content;
    private PageableDto pageable;
    private long totalElements;
    private int totalPages;
    private boolean last;
    private boolean first;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PageableDto {
        private int pageNumber;
        private int pageSize;
    }

    public static <T> PagedResponse<T> fromPage(Page<T> page) {
        return PagedResponse.<T>builder()
                .content(page.getContent())
                .pageable(PageableDto.builder()
                        .pageNumber(page.getNumber())
                        .pageSize(page.getSize())
                        .build())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .last(page.isLast())
                .first(page.isFirst())
                .build();
    }
}
