package com.medicalmanagment.medimanager.services;
import com.medicalmanagment.medimanager.entity.Medicine;
import com.medicalmanagment.medimanager.repositories.MedicineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MedicineService {
    private final MedicineRepository medicineRepository;

    public Medicine addMedicine(Medicine medicine) {
        return medicineRepository.save(medicine);
    }

    public Medicine updateMedicine(Long id, Medicine updated) {
        Medicine med = medicineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicine not found"));
        med.setName(updated.getName());
        med.setPrice(updated.getPrice());
        med.setQuantity(updated.getQuantity());
        med.setExpiryDate(updated.getExpiryDate());
        med.setManufacturer(updated.getManufacturer());
        med.setDescription(updated.getDescription());
        return medicineRepository.save(med);
    }

    public void deleteMedicine(Long id) {
        medicineRepository.deleteById(id);
    }

    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }

    public List<Medicine> searchByName(String name) {
        return medicineRepository.findByNameContainingIgnoreCase(name);
    }

    public List<Medicine> getLowStock(int threshold) {
        return medicineRepository.findByQuantityLessThan(threshold);
    }

    public List<Medicine> getExpiringSoon(int days) {
        LocalDate cutoffDate = LocalDate.now().plusDays(days);
        return medicineRepository.findMedicinesExpiringBefore(cutoffDate);
    }

    // Scheduled daily alert
    @Scheduled(cron = "0 0 9 * * *")
    public void checkExpiryAlerts() {
        List<Medicine> expiring = getExpiringSoon(30);
        if (!expiring.isEmpty()) {
            System.out.println("⚠ Expiry Alert: " + expiring.size() + " medicines expiring soon.");
            expiring.forEach(m -> System.out.println(m.getName() + " - Expiry: " + m.getExpiryDate()));
        }
    }
}

