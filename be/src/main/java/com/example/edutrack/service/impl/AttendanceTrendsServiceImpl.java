package com.example.edutrack.service.impl;

import com.example.edutrack.config.TenantContext;
import com.example.edutrack.dto.AttendanceTrendsDto;
import com.example.edutrack.repository.AttendanceRepository;
import com.example.edutrack.repository.BranchMonthlyAttendanceProjection;
import com.example.edutrack.service.AttendanceTrendsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AttendanceTrendsServiceImpl implements AttendanceTrendsService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Override
    @Transactional(readOnly = true)
    @Cacheable(value = "attendanceTrends", key = "#institutionId + '-' + #months + '-' + #year + '-' + #branch")
    public AttendanceTrendsDto getTrends(UUID institutionId, int months, Integer year, String branch) {
        TenantContext.setCurrentTenant(institutionId.toString());

        // Validate and normalize parameters
        int numMonths = Math.max(1, Math.min(months, 12));
        
        LocalDate today = LocalDate.now();
        // Go back numMonths - 1, and set to first day of that month
        LocalDate startDate = today.minusMonths(numMonths - 1).withDayOfMonth(1);

        String branchCode = (branch != null && !branch.isBlank() && !"All Branches".equalsIgnoreCase(branch)) ? branch : null;

        // Fetch data
        List<BranchMonthlyAttendanceProjection> rawData = attendanceRepository.findBranchMonthlyAttendance(
                institutionId, startDate, year, branchCode
        );

        // Prepare month labels and a mapping for O(1) index lookup
        List<String> monthLabels = new ArrayList<>();
        Map<String, Integer> monthToIndex = new HashMap<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM");
        
        for (int i = 0; i < numMonths; i++) {
            LocalDate d = startDate.plusMonths(i);
            String label = d.format(formatter); // e.g., "Sep"
            monthLabels.add(label);
            // key: "YYYY-M"
            String key = d.getYear() + "-" + d.getMonthValue();
            monthToIndex.put(key, i);
        }

        // Group data by branch
        Map<String, List<BranchMonthlyAttendanceProjection>> groupedByBranch = rawData.stream()
                .collect(Collectors.groupingBy(BranchMonthlyAttendanceProjection::getBranchCode));

        List<AttendanceTrendsDto.SeriesDto> seriesList = new ArrayList<>();

        for (Map.Entry<String, List<BranchMonthlyAttendanceProjection>> entry : groupedByBranch.entrySet()) {
            String bCode = entry.getKey();
            List<BranchMonthlyAttendanceProjection> records = entry.getValue();

            // Initialize data array with 0.0
            Double[] dataArr = new Double[numMonths];
            Arrays.fill(dataArr, 0.0);

            for (BranchMonthlyAttendanceProjection r : records) {
                String key = r.getYr() + "-" + r.getMo();
                Integer index = monthToIndex.get(key);
                if (index != null) {
                    double percentage = 0.0;
                    if (r.getTotalCount() > 0) {
                        percentage = (r.getPresentCount() * 100.0) / r.getTotalCount();
                    }
                    dataArr[index] = Math.round(percentage * 10.0) / 10.0; // Round to 1 decimal place
                }
            }

            seriesList.add(AttendanceTrendsDto.SeriesDto.builder()
                    .label(bCode)
                    .data(Arrays.asList(dataArr))
                    .build());
        }

        // Sort series by label for consistent ordering
        seriesList.sort(Comparator.comparing(AttendanceTrendsDto.SeriesDto::getLabel));

        return AttendanceTrendsDto.builder()
                .months(monthLabels)
                .series(seriesList)
                .build();
    }
}
