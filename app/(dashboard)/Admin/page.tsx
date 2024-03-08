import BinSizeForm from '@/app/components/BinSizeForm'
import NewBinForm from '@/app/components/NewBinForm'
import NewCustomerForm from '@/app/components/NewCustomerForm'
import NewLocationForm from '@/app/components/NewLocationForm'
import React from 'react'

const page = () => {
  return (
    <div>Forms:
      <hr />
      <li>Bin Sizes</li>
      <BinSizeForm />
      <hr />
      <li>Bins</li>
      <NewBinForm />
      <hr />
      <li>Customer</li>
      <NewCustomerForm />
      <hr />
      <li>Location</li>
      <NewLocationForm />
    </div>
  )
}

export default page