package com.medicalmanagment.medimanager.repositories;
import com.medicalmanagment.medimanager.entity.BillItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BillItemRepository extends JpaRepository<BillItem, Long> {
}

