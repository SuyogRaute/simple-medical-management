package com.medicalmanagment.medimanager.controllers;
import com.medicalmanagment.medimanager.entity.Bill;
import com.medicalmanagment.medimanager.entity.BillItem;
import com.medicalmanagment.medimanager.services.BillingService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/billing")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class BillingController {
    private final BillingService billingService;

    @PostMapping
    public Bill createBill(@RequestBody List<BillItem> billItems) {
        return billingService.createBill(billItems);
    }

    @GetMapping
    public List<Bill> getAllBills() {
        return billingService.getAllBills();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bill> getBillById(@PathVariable Long id) {
        try {
            Bill bill = billingService.getBillById(id);
            return ResponseEntity.ok(bill);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

}
