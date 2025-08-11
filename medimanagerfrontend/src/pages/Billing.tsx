import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import { Trash2 } from 'lucide-react'
import { getAllMedicines, createBill, Medicine, BillItem } from '../lib/api'

export function Billing() {
  const navigate = useNavigate()
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [selectedMedicine, setSelectedMedicine] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [billItems, setBillItems] = useState<Omit<BillItem, 'id' | 'bill'>[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const data = await getAllMedicines()
        setMedicines(data)
      } catch (error) {
        toast.error('Failed to fetch medicines')
      }
    }
    fetchMedicines()
  }, [])

  const addItem = () => {
    const medicine = medicines.find((m) => m.id === parseInt(selectedMedicine))
    if (!medicine) {
      toast.error('Please select a medicine')
      return
    }
    if (quantity <= 0 || quantity > medicine.quantity) {
      toast.error('Invalid quantity')
      return
    }

    setBillItems([
      ...billItems,
      {
        quantity,
        pricePerUnit: medicine.price,
        medicine
      }
    ])
    setSelectedMedicine('')
    setQuantity(1)
  }

  const removeItem = (index: number) => {
    setBillItems(billItems.filter((_, i) => i !== index))
  }

  const calculateTotal = () => {
    return billItems.reduce((sum, item) => sum + item.quantity * item.pricePerUnit, 0).toFixed(2)
  }

  const handleSubmit = async () => {
    if (billItems.length === 0) {
      toast.error('Please add at least one item')
      return
    }

    setIsLoading(true)
    try {
      await createBill(billItems)
      toast.success('Bill created successfully')
      navigate('/bills')
    } catch (error) {
      toast.error('Failed to create bill')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 animate-slide-up">
      <h1 className="text-3xl font-heading font-bold text-neutral-600">Create Bill</h1>
      <div className="card">
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="medicine" className="block text-sm font-medium text-neutral-600">
                Select Medicine
              </label>
              <select
                id="medicine"
                value={selectedMedicine}
                onChange={(e) => setSelectedMedicine(e.target.value)}
                className="input w-full"
              >
                <option value="">Select a medicine</option>
                {medicines.map((medicine) => (
                  <option key={medicine.id} value={medicine.id}>
                    {medicine.name} (Stock: {medicine.quantity})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-neutral-600">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="input w-full"
                min="1"
              />
            </div>
          </div>
          <button className="btn-primary" onClick={addItem}>
            Add Item
          </button>

          {billItems.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4">Medicine</th>
                    <th className="py-3 px-4">Quantity</th>
                    <th className="py-3 px-4">Unit Price</th>
                    <th className="py-3 px-4">Subtotal</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {billItems.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3 px-4">{item.medicine.name}</td>
                      <td className="py-3 px-4">{item.quantity}</td>
                      <td className="py-3 px-4">${item.pricePerUnit.toFixed(2)}</td>
                      <td className="py-3 px-4">${(item.quantity * item.pricePerUnit).toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => removeItem(index)}
                          className="text-alert hover:text-red-700"
                        >
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 text-right">
                <p className="text-lg font-bold">Total: ${calculateTotal()}</p>
              </div>
            </div>
          )}

          <button
            className="btn-primary mt-4"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Creating Bill...' : 'Create Bill'}
          </button>
        </div>
      </div>
    </div>
  )
}