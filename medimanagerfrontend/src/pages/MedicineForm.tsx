import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addMedicine, updateMedicine, getAllMedicines, Medicine } from '../lib/api'
import clsx from 'clsx'

export function MedicineForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [formData, setFormData] = useState<Omit<Medicine, 'id'>>({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    expiryDate: '',
    manufacturer: ''
  })
  const [errors, setErrors] = useState<Partial<Record<keyof Omit<Medicine, 'id'>, string>>>({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (id) {
      const fetchMedicine = async () => {
        try {
          const medicines = await getAllMedicines()
          const medicine = medicines.find((m) => m.id === parseInt(id))
          if (medicine) {
            setFormData({
              name: medicine.name,
              description: medicine.description,
              price: medicine.price,
              quantity: medicine.quantity,
              expiryDate: medicine.expiryDate.split('T')[0],
              manufacturer: medicine.manufacturer
            })
          }
        } catch (error) {
          toast.error('Failed to fetch medicine')
        }
      }
      fetchMedicine()
    }
  }, [id])

  const validateForm = () => {
    const newErrors: Partial<Record<keyof Omit<Medicine, 'id'>, string>> = {}
    if (!formData.name) newErrors.name = 'Name is required'
    if (formData.price <= 0) newErrors.price = 'Price must be greater than 0'
    if (formData.quantity < 0) newErrors.quantity = 'Quantity cannot be negative'
    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required'
    if (new Date(formData.expiryDate) < new Date()) newErrors.expiryDate = 'Expiry date must be in the future'
    if (!formData.manufacturer) newErrors.manufacturer = 'Manufacturer is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    try {
      if (id) {
        await updateMedicine(parseInt(id), formData)
        toast.success('Medicine updated successfully')
      } else {
        await addMedicine(formData)
        toast.success('Medicine added successfully')
      }
      navigate('/')
    } catch (error) {
      toast.error('Failed to save medicine')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  return (
    <div className="space-y-6 animate-slide-up">
      <h1 className="text-3xl font-heading font-bold text-neutral-600">
        {id ? 'Edit Medicine' : 'Add Medicine'}
      </h1>
      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-neutral-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={clsx('input w-full', errors.name && 'border-alert')}
            />
            {errors.name && <p className="text-alert text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-neutral-600">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input w-full"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-neutral-600">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={clsx('input w-full', errors.price && 'border-alert')}
                step="0.01"
                min="0"
              />
              {errors.price && <p className="text-alert text-sm mt-1">{errors.price}</p>}
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-neutral-600">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className={clsx('input w-full', errors.quantity && 'border-alert')}
                min="0"
              />
              {errors.quantity && <p className="text-alert text-sm mt-1">{errors.quantity}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-neutral-600">
              Expiry Date
            </label>
            <input
              type="date"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className={clsx('input w-full', errors.expiryDate && 'border-alert')}
            />
            {errors.expiryDate && <p className="text-alert text-sm mt-1">{errors.expiryDate}</p>}
          </div>

          <div>
            <label htmlFor="manufacturer" className="block text-sm font-medium text-neutral-600">
              Manufacturer
            </label>
            <input
              type="text"
              id="manufacturer"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
              className={clsx('input w-full', errors.manufacturer && 'border-alert')}
            />
            {errors.manufacturer && <p className="text-alert text-sm mt-1">{errors.manufacturer}</p>}
          </div>

          <div className="flex gap-4">
            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}