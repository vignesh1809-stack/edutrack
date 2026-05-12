package com.example.edutrack.service;

import com.example.edutrack.dto.PrincipalRemarkFeedItemDto;
import com.example.edutrack.dto.PrincipalRemarkResolveDto;
import com.example.edutrack.dto.PrincipalRemarksSummaryDto;
import com.example.edutrack.entity.Remarks;
import com.example.edutrack.entity.enums.RemarkStatus;
import com.example.edutrack.entity.enums.RemarkTarget;
import com.example.edutrack.repository.RemarksRepository;
import com.example.edutrack.repository.projections.PrincipalRemarkFeedProjection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class PrincipalRemarksService {

    @Autowired
    private RemarksRepository remarksRepository;

    public PrincipalRemarksSummaryDto getDashboardSummary(UUID instId) {
        long totalRemarks = remarksRepository.countByInstitutionIdAndIsDeletedFalse(instId);
        long resolvedRemarks = remarksRepository.countByInstitutionIdAndStatusAndIsDeletedFalse(instId, RemarkStatus.RESOLVED);
        long staffRemarks = remarksRepository.countPendingStaffRemarksNative(instId);
        long campusRemarks = remarksRepository.countPendingCampusRemarksNative(instId);

        double resolutionRate = totalRemarks == 0 ? 0 : (double) resolvedRemarks / totalRemarks * 100;

        return PrincipalRemarksSummaryDto.builder()
                .resolutionRate(Math.round(resolutionRate * 10.0) / 10.0)
                .trendPercentage(2.4) // Mocked for now
                .staffRemarksCount(staffRemarks)
                .campusRemarksCount(campusRemarks)
                .build();
    }

    public Page<PrincipalRemarkFeedItemDto> getRemarksFeed(UUID instId, RemarkTarget target, Pageable pageable) {
        Page<PrincipalRemarkFeedProjection> results;
        if (target == RemarkTarget.CAMPUS) {
            results = remarksRepository.findCampusRemarksNative(instId, pageable);
        } else {
            results = remarksRepository.findStaffRemarksNative(instId, pageable);
        }
        return results.map(this::convertProjectionToDto);
    }

    @Transactional
    public void resolveRemark(UUID instId, UUID remarkId, PrincipalRemarkResolveDto resolveDto) {
        Remarks remark = remarksRepository.findById(remarkId)
                .orElseThrow(() -> new RuntimeException("Remark not found"));
        
        if (!remark.getInstitutionId().equals(instId)) {
            throw new RuntimeException("Unauthorized");
        }

        remark.setStatus(RemarkStatus.RESOLVED);
        remark.setPrincipalAction(resolveDto.getActionTaken() + ": " + resolveDto.getDescription());
        remark.setResolvedAt(java.time.LocalDateTime.now());
        remarksRepository.save(remark);
    }

    private PrincipalRemarkFeedItemDto convertProjectionToDto(PrincipalRemarkFeedProjection projection) {
        return PrincipalRemarkFeedItemDto.builder()
                .id(projection.getId())
                .authorName(projection.getAuthorName())
                .authorCode(projection.getAuthorCode())
                .academicInfo(projection.getAcademicInfo())
                .content(projection.getContent())
                .urgency(projection.getPriority())
                .createdAt(projection.getCreatedAt())
                .status(RemarkStatus.valueOf(projection.getStatus()))
                .targetStaffName(projection.getTargetStaffName())
                .build();
    }
}
