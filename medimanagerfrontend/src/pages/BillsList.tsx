import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import { getAllBills, Bill } from '../lib/api'

export function BillsList() {
  const [bills, setBills] = useState<Bill[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchBills = async () => {
      setIsLoading(true)
      try {
        const data = await getAllBills()
        setBills(data)
      } catch (error) {
        toast.error('Failed to fetch bills')
      } finally {
        setIsLoading(false)
      }
    }
    fetchBills()
  }, [])

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-heading font-bold text-neutral-600">Bills</h1>
      <div className="card">
        {isLoading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Total Amount</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((bill) => (
                  <tr key={bill.id} className="border-b">
                    <td className="py-3 px-4">{bill.id}</td>
                    <td className="py-3 px-4">{format(new Date(bill.billDate), 'MMM dd, yyyy')}</td>
                    <td className="py-3 px-4">${bill.totalAmount.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <Link to={`/bills/${bill.id}`} className="btn-primary">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}