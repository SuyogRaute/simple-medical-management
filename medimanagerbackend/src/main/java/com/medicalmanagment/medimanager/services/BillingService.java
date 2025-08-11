package com.medicalmanagment.medimanager.services;




import com.medicalmanagment.medimanager.entity.Bill;
import com.medicalmanagment.medimanager.entity.BillItem;
import com.medicalmanagment.medimanager.entity.Medicine;
import com.medicalmanagment.medimanager.repositories.BillRepository;
import com.medicalmanagment.medimanager.repositories.MedicineRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BillingService {
    private final MedicineRepository medicineRepository;
    private final BillRepository billRepository;

    @Transactional
    public Bill createBill(List<BillItem> billItems) {
        Bill bill = new Bill();
        bill.setBillDate(LocalDate.now());

        double total = 0;
        for (BillItem item : billItems) {
            Medicine medicine = medicineRepository.findById(item.getMedicine().getId())
                    .orElseThrow(() -> new RuntimeException("Medicine not found"));

            if (medicine.getQuantity() < item.getQuantity()) {
                throw new RuntimeException("Not enough stock for " + medicine.getName());
            }

            medicine.setQuantity(medicine.getQuantity() - item.getQuantity());
            medicineRepository.save(medicine);

            item.setPricePerUnit(medicine.getPrice());
            item.setBill(bill);
            total += item.getPricePerUnit() * item.getQuantity();
        }

        bill.setItems(billItems);
        bill.setTotalAmount(total);
        return billRepository.save(bill);
    }

    public List<Bill> getAllBills() {
        return billRepository.findAll();
    }

    public Bill getBillById(Long id) {
        return billRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Bill not found with id " + id));
    }

}

