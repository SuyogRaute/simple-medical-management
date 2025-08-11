import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layouts/Layout'
import { MedicinesList } from './pages/MedicinesList'
import { MedicineForm } from './pages/MedicineForm'
import { Billing } from './pages/Billing'
import { BillsList } from './pages/BillsList'
import { BillDetails } from './pages/BillDetails'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MedicinesList />} />
        <Route path="/medicines/add" element={<MedicineForm />} />
        <Route path="/medicines/edit/:id" element={<MedicineForm />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/bills" element={<BillsList />} />
        <Route path="/bills/:id" element={<BillDetails />} />
      </Routes>
    </Layout>
  )
}