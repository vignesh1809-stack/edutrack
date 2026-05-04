package com.example.edutrack.service.impl;

import com.example.edutrack.dto.AttendanceGraphDto;
import com.example.edutrack.repository.AttendanceRepository;
import com.example.edutrack.repository.DailyAttendanceProjection;
import com.example.edutrack.service.StaffDashboardService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class StaffDashboardServiceImpl implements StaffDashboardService {

    private static final Logger logger = LoggerFactory.getLogger(StaffDashboardServiceImpl.class);

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Override
    public List<AttendanceGraphDto> getAttendanceGraph(UUID institutionId, int days, Integer year, String section) {
        logger.info("[AttendanceGraph] Fetching graph — days: {}, year: {}, section: {}", days, year, section);
        LocalDate startDate = LocalDate.now().minusDays(days);
        
        List<DailyAttendanceProjection> rawData;
        if (year == null && section == null) {
            logger.info("[AttendanceGraph] Using GLOBAL query");
            rawData = attendanceRepository.getAttendanceGraphData(institutionId, startDate);
        } else {
            logger.info("[AttendanceGraph] Using FILTERED query — year: {}, section: {}", year, section);
            rawData = attendanceRepository.getAttendanceGraphDataFiltered(institutionId, startDate, year, section);
        }
        
        List<AttendanceGraphDto> result = new ArrayList<>();
        
        for (DailyAttendanceProjection row : rawData) {
            long presentCount = row.getPresentCount() != null ? row.getPresentCount() : 0;
            long totalCount = row.getTotalCount() != null ? row.getTotalCount() : 0;
            double percentage = totalCount > 0 ? (double) presentCount / totalCount * 100 : 0.0;
            
            // Round to 1 decimal place
            percentage = Math.round(percentage * 10.0) / 10.0;
            
            result.add(new AttendanceGraphDto(row.getRecordDate(), presentCount, totalCount, percentage));
        }
        return result;
    }
}
