import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import { Trash2, Edit, Search } from 'lucide-react'
import { getAllMedicines, deleteMedicine, searchMedicines, getLowStock, getExpiringSoon, Medicine } from '../lib/api'
import clsx from 'clsx'

export function MedicinesList() {
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const fetchMedicines = async () => {
    setIsLoading(true)
    try {
      const data = await getAllMedicines()
      setMedicines(data)
    } catch (error) {
      toast.error('Failed to fetch medicines')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchTerm) {
      fetchMedicines()
      return
    }
    setIsLoading(true)
    try {
      const data = await searchMedicines(searchTerm)
      setMedicines(data)
    } catch (error) {
      toast.error('Failed to search medicines')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLowStock = async () => {
    setIsLoading(true)
    try {
      const data = await getLowStock(5)
      setMedicines(data)
    } catch (error) {
      toast.error('Failed to fetch low stock medicines')
    } finally {
      setIsLoading(false)
    }
  }

  const handleExpiringSoon = async () => {
    setIsLoading(true)
    try {
      const data = await getExpiringSoon(30)
      setMedicines(data)
    } catch (error) {
      toast.error('Failed to fetch expiring medicines')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteMedicine(id)
      setMedicines(medicines.filter((medicine) => medicine.id !== id))
      toast.success('Medicine deleted successfully')
    } catch (error) {
      toast.error('Failed to delete medicine')
    }
  }

  useEffect(() => {
    fetchMedicines()
  }, [])

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-heading font-bold text-neutral-600">Medicines</h1>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
          <input
            type="text"
            placeholder="Search medicines..."
            className="input pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <div className="flex gap-2">
          <button className="btn-primary" onClick={handleSearch}>
            Search
          </button>
          <button className="btn-secondary" onClick={handleLowStock}>
            Low Stock
          </button>
          <button className="btn-secondary" onClick={handleExpiringSoon}>
            Expiring Soon
          </button>
          <Link to="/medicines/add" className="btn-primary">
            Add Medicine
          </Link>
        </div>
      </div>

      <div className="card">
        {isLoading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Quantity</th>
                  <th className="py-3 px-4">Expiry Date</th>
                  <th className="py-3 px-4">Manufacturer</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((medicine) => (
                  <tr
                    key={medicine.id}
                    className={clsx(
                      'border-b',
                      medicine.quantity <= 5 && 'bg-yellow-100',
                      new Date(medicine.expiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && 'bg-red-100'
                    )}
                  >
                    <td className="py-3 px-4">{medicine.name}</td>
                    <td className="py-3 px-4">${medicine.price.toFixed(2)}</td>
                    <td className="py-3 px-4">{medicine.quantity}</td>
                    <td className="py-3 px-4">{format(new Date(medicine.expiryDate), 'MMM dd, yyyy')}</td>
                    <td className="py-3 px-4">{medicine.manufacturer}</td>
                    <td className="py-3 px-4 flex gap-2">
                      <Link to={`/medicines/edit/${medicine.id}`} className="text-primary hover:text-blue-700">
                        <Edit size={20} />
                      </Link>
                      <button
                        onClick={() => handleDelete(medicine.id)}
                        className="text-alert hover:text-red-700"
                      >
                        <Trash2 size={20} />
                      </button>
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