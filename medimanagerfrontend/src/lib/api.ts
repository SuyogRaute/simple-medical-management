import axios from 'axios'

export interface Medicine {
  id: number
  name: string
  description: string
  price: number
  quantity: number
  expiryDate: string
  manufacturer: string
}

export interface BillItem {
  id?: number
  quantity: number
  pricePerUnit: number
  medicine: Medicine
  bill?: number
}

export interface Bill {
  id: number
  billDate: string
  totalAmount: number
  items: BillItem[]
}

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Medicine API calls
export const getAllMedicines = async (): Promise<Medicine[]> => {
  const response = await api.get('/medicines')
  return response.data
}

export const addMedicine = async (medicine: Omit<Medicine, 'id'>): Promise<Medicine> => {
  const response = await api.post('/medicines', medicine)
  return response.data
}

export const updateMedicine = async (id: number, medicine: Omit<Medicine, 'id'>): Promise<Medicine> => {
  const response = await api.put(`/medicines/${id}`, medicine)
  return response.data
}

export const deleteMedicine = async (id: number): Promise<void> => {
  await api.delete(`/medicines/${id}`)
}

export const searchMedicines = async (name: string): Promise<Medicine[]> => {
  const response = await api.get(`/medicines/search?name=${name}`)
  return response.data
}

export const getLowStock = async (threshold: number): Promise<Medicine[]> => {
  const response = await api.get(`/medicines/lowstock?threshold=${threshold}`)
  return response.data
}

export const getExpiringSoon = async (days: number): Promise<Medicine[]> => {
  const response = await api.get(`/medicines/expiring?days=${days}`)
  return response.data
}

// Billing API calls
export const createBill = async (billItems: Omit<BillItem, 'id' | 'bill'>[]): Promise<Bill> => {
  const response = await api.post('/billing', billItems)
  return response.data
}

export const getAllBills = async (): Promise<Bill[]> => {
  const response = await api.get('/billing')
  return response.data
}

export const getBillById = async (id: number): Promise<Bill> => {
  const response = await api.get(`/billing/${id}`)
  return response.data
}