package com.fuspeak;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.fuspeak.mapper")
public class FuSpeakApplication {

    public static void main(String[] args) {
        SpringApplication.run(FuSpeakApplication.class, args);
        System.out.println("\n========================================");
        System.out.println("fu-speak Server Started Successfully!");
        System.out.println("Admin Panel: http://localhost:8080");
        System.out.println("H2 Console: http://localhost:8080/h2-console");
        System.out.println("Default Admin: admin / admin123");
        System.out.println("========================================\n");
    }
}
