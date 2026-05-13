package com.example.edutrack;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

// Explicitly declare these as JPA repositories so Spring Data Redis
// stops scanning them and emitting "could not safely identify store" warnings.
@SpringBootApplication
@EnableCaching
@EnableJpaRepositories(basePackages = "com.example.edutrack.repository")
public class EdutrackApplication {

	public static void main(String[] args) {
		SpringApplication.run(EdutrackApplication.class, args);
	}

}
