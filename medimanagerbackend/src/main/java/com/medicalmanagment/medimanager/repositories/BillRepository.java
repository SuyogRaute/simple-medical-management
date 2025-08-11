package com.medicalmanagment.medimanager.repositories;
import com.medicalmanagment.medimanager.entity.Bill;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {

    @EntityGraph(attributePaths = {"items", "items.medicine"})
    List<Bill> findAll();

    @EntityGraph(attributePaths = {"items", "items.medicine"})
    Optional<Bill> findById(Long id);
}

