package com.example.edutrack.security;

import com.example.edutrack.config.TenantContext;
import com.example.edutrack.entity.Guardian;
import com.example.edutrack.entity.Staff;
import com.example.edutrack.repository.GuardianRepository;
import com.example.edutrack.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private GuardianRepository guardianRepository;

    @Override
    public UserDetails loadUserByUsername(String phone) throws UsernameNotFoundException {
        // This is tricky because the username doesn't contain institutionId.
        // Usually, in multi-tenant login, the username is sent as institution:phone
        // or the context is set beforehand.
        // For standard Spring Security filters, we might need a custom authentication provider.
        // However, for the initial login call, we'll have both from the AuthRequest.
        throw new UsernameNotFoundException("Use loadUserByInstitutionAndPhone instead");
    }

    public UserDetails loadUserByInstitutionAndPhone(UUID institutionId, String phone) throws UsernameNotFoundException {
        // Essential: Set the tenant identifier for Hibernate's @TenantId filtering
        TenantContext.setCurrentTenant(institutionId.toString());
        
        try {
            // Use native query to find staff, bypassing Hibernate's automatic @TenantId filter
            // during the authentication phase to avoid issues with tenant identifier resolution.
            Optional<Staff> staffOpt = staffRepository.findByPhoneNative(institutionId, phone);
            if (staffOpt.isPresent()) {
                Staff staff = staffOpt.get();
                return new CustomUserDetails(staff.getId(), staff.getPhone(), staff.getPassword(), staff.getRole().name(), institutionId);
            }

            // Use native query to find guardian
            Optional<Guardian> guardianOpt = guardianRepository.findByPhoneNative(institutionId, phone);
            if (guardianOpt.isPresent()) {
                Guardian guardian = guardianOpt.get();
                return new CustomUserDetails(guardian.getId(), guardian.getPhone(), guardian.getPassword(), "GUARDIAN", institutionId);
            }
        } finally {
            // Context remains for the request duration
        }

        throw new UsernameNotFoundException("User not found with phone: " + phone + " in institution: " + institutionId);
    }
}
