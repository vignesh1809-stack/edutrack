package com.example.edutrack.repository;

import com.example.edutrack.entity.PaperSubmissionPage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PaperSubmissionPageRepository extends JpaRepository<PaperSubmissionPage, UUID> {

    List<PaperSubmissionPage> findByMd5Hash(String md5Hash);
}
