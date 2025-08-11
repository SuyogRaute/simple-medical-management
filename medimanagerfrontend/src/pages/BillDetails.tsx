import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import { getBillById, Bill } from '../lib/api'

export function BillDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [bill, setBill] = useState<Bill | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchBill = async () => {
      if (!id) return
      setIsLoading(true)
      try {
        const data = await getBillById(parseInt(id))
        setBill(data)
      } catch (error) {
        toast.error('Failed to fetch bill details')
        navigate('/bills')
      } finally {
        setIsLoading(false)
      }
    }
    fetchBill()
  }, [id, navigate])

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>
  }

  if (!bill) {
    return <div className="text-center py-4">Bill not found</div>
  }

  return (
    <div className="space-y-6 animate-slide-up">
      <h1 className="text-3xl font-heading font-bold text-neutral-600">Bill Details</h1>
      <div className="card">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-neutral-400">Bill ID</p>
            <p className="text-lg font-bold">{bill.id}</p>
          </div>
          <div>
            <p className="text-sm text-neutral-400">Date</p>
            <p className="text-lg">{format(new Date(bill.billDate), 'MMM dd, yyyy')}</p>
          </div>
          <div>
            <p className="text-sm text-neutral-400">Total Amount</p>
            <p className="text-lg font-bold">${bill.totalAmount.toFixed(2)}</p>
          </div>

          <h2 className="text-xl font-heading font-bold text-neutral-600 mt-6">Items</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4">Medicine</th>
                  <th className="py-3 px-4">Quantity</th>
                  <th className="py-3 px-4">Unit Price</th>
                  <th className="py-3 px-4">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {bill.items.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-3 px-4">{item.medicine.name}</td>
                    <td className="py-3 px-4">{item.quantity}</td>
                    <td className="py-3 px-4">${item.pricePerUnit.toFixed(2)}</td>
                    <td className="py-3 px-4">${(item.quantity * item.pricePerUnit).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            className="btn-secondary mt-4"
            onClick={() => navigate('/bills')}
          >
            Back to Bills
          </button>
        </div>
      </div>
    </div>
  )
}