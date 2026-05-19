package com.example.edutrack.security;

import com.example.edutrack.config.TenantContext;
import com.example.edutrack.entity.Guardian;
import com.example.edutrack.entity.Staff;
import com.example.edutrack.entity.Student;
import com.example.edutrack.repository.GuardianRepository;
import com.example.edutrack.repository.StaffRepository;
import com.example.edutrack.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private GuardianRepository guardianRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public UserDetails loadUserByUsername(String phone) throws UsernameNotFoundException {
        throw new UsernameNotFoundException("Use loadUserByInstitutionAndPhone instead");
    }

    /**
     * Role-aware lookup: routes to the correct table based on the role string.
     * Accepted role values: "STAFF", "GUARDIAN", "STUDENT" (case-insensitive).
     */
    public UserDetails loadUserByInstitutionAndPhone(UUID institutionId, String phone, String role)
            throws UsernameNotFoundException {

        // Set tenant context for Hibernate @TenantId filtering
        TenantContext.setCurrentTenant(institutionId.toString());

        String normalizedRole = (role != null) ? role.toUpperCase() : "STAFF";

        switch (normalizedRole) {
            case "STUDENT": {
                Optional<Student> studentOpt = studentRepository.findByPhoneNative(institutionId, phone);
                if (studentOpt.isPresent()) {
                    Student student = studentOpt.get();
                    String deptName = null;
                    try {
                        if (student.getSchoolClass() != null && student.getSchoolClass().getDepartment() != null) {
                            deptName = student.getSchoolClass().getDepartment().getName();
                        }
                    } catch (jakarta.persistence.EntityNotFoundException e) {
                        deptName = null;
                    }

                    return new CustomUserDetails(
                            student.getId(),
                            student.getFirstName() + " " + student.getLastName(),
                            student.getPhone(),
                            student.getPassword(),
                            "STUDENT",
                            institutionId,
                            deptName,
                            student.getAvatarUrl()
                    );
                }
                throw new UsernameNotFoundException(
                        "Student not found with phone: " + phone + " in institution: " + institutionId);
            }

            case "GUARDIAN": {
                Optional<Guardian> guardianOpt = guardianRepository.findByPhoneNative(institutionId, phone);
                if (guardianOpt.isPresent()) {
                    Guardian guardian = guardianOpt.get();
                    return new CustomUserDetails(
                            guardian.getId(),
                            guardian.getName(),
                            guardian.getPhone(),
                            guardian.getPassword(),
                            "GUARDIAN",
                            institutionId,
                            null,
                            null
                    );
                }
                throw new UsernameNotFoundException(
                        "Guardian not found with phone: " + phone + " in institution: " + institutionId);
            }

            default: {
                // STAFF, TRANSPORT, ADMINISTRATOR — all live in the staffs table
                Optional<Staff> staffOpt = staffRepository.findByPhoneNative(institutionId, phone);
                if (staffOpt.isPresent()) {
                    Staff staff = staffOpt.get();
                    if (staff.getRole() == null) {
                        throw new UsernameNotFoundException(
                            "Staff account has no role assigned. Contact your administrator. Phone: " + phone);
                    }
                    String deptName = null;
                    try {
                        if (staff.getDepartment() != null) {
                            deptName = staff.getDepartment().getName();
                        }
                    } catch (jakarta.persistence.EntityNotFoundException e) {
                        // Handle case where department_id exists in staffs but record is missing in departments
                        deptName = null;
                    }

                    return new CustomUserDetails(
                            staff.getId(),
                            staff.getFirstName() + " " + staff.getLastName(),
                            staff.getPhone(),
                            staff.getPassword(),
                            staff.getRole().name(),
                            institutionId,
                            deptName,
                            staff.getAvatarUrl()
                    );
                }
                throw new UsernameNotFoundException(
                        "Staff not found with phone: " + phone + " in institution: " + institutionId);
            }
        }
    }
}
