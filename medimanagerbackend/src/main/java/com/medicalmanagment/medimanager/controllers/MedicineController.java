package com.medicalmanagment.medimanager.controllers;
import com.medicalmanagment.medimanager.entity.Medicine;
import com.medicalmanagment.medimanager.services.MedicineService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/medicines")
@RequiredArgsConstructor
public class MedicineController {
    private final MedicineService medicineService;

    @PostMapping
    public Medicine add(@RequestBody Medicine medicine) {
        return medicineService.addMedicine(medicine);
    }

    @PutMapping("/{id}")
    public Medicine update(@PathVariable Long id, @RequestBody Medicine medicine) {
        return medicineService.updateMedicine(id, medicine);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        medicineService.deleteMedicine(id);
    }

    @GetMapping
    public List<Medicine> all() {
        return medicineService.getAllMedicines();
    }

    @GetMapping("/search")
    public List<Medicine> search(@RequestParam String name) {
        return medicineService.searchByName(name);
    }

    @GetMapping("/lowstock")
    public List<Medicine> lowStock(@RequestParam(defaultValue = "5") int threshold) {
        return medicineService.getLowStock(threshold);
    }

    @GetMapping("/expiring")
    public List<Medicine> expiringSoon(@RequestParam(defaultValue = "30") int days) {
        return medicineService.getExpiringSoon(days);
    }
}
