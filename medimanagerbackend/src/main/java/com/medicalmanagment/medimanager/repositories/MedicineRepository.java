package com.medicalmanagment.medimanager.repositories;
import com.medicalmanagment.medimanager.entity.Medicine;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface MedicineRepository extends JpaRepository<Medicine, Long> {
    List<Medicine> findByNameContainingIgnoreCase(String name);
    List<Medicine> findByQuantityLessThan(int quantity);

    @Query("SELECT m FROM Medicine m WHERE m.expiryDate <= :date")
    List<Medicine> findMedicinesExpiringBefore(@Param("date") LocalDate date);
}
