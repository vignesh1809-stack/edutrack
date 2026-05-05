package com.example.edutrack.repository.specification;

import com.example.edutrack.entity.Department;
import com.example.edutrack.entity.Student;
import com.example.edutrack.entity.enums.StudentStatus;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class StudentSpecification {

    public static Specification<Student> getFilteredStudents(
            UUID institutionId,
            String search,
            StudentStatus status,
            String course,
            Integer batchYear,
            String section) {

        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Only filter by not deleted (institutionId is handled by @TenantId)
            predicates.add(cb.equal(root.get("isDeleted"), false));

            if (search != null && !search.isEmpty()) {
                String searchPattern = "%" + search.toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("firstName")), searchPattern),
                        cb.like(cb.lower(root.get("lastName")), searchPattern),
                        cb.like(cb.lower(root.get("studentId")), searchPattern)
                ));
            }

            if (status != null) {
                predicates.add(cb.equal(root.get("status"), status));
            }

            if (course != null || batchYear != null || section != null) {
                Join<Student, Department> departmentJoin = root.join("department");
                if (course != null && !course.isEmpty()) {
                    predicates.add(cb.like(cb.lower(departmentJoin.get("name")), "%" + course.toLowerCase() + "%"));
                }
                if (batchYear != null) {
                    predicates.add(cb.equal(departmentJoin.get("batchYear"), batchYear));
                }
                if (section != null && !section.isEmpty()) {
                    predicates.add(cb.equal(departmentJoin.get("section"), section));
                }
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
