import React from 'react'
import OrderCard from './OrderCard'

function Orders() {
  return (
    <div className='flex items-center flex-col px-6'>
      <h1 className='text-3xl text-center py-7 font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent'>My Orders</h1>
      <div className='w-full lg:w-1/2 space-y-5'>
        {
           [1,1,1,1].map((item, idx) => <div key={idx} className='rounded-2xl backdrop-blur-xl bg-white/10 border border-white/10 p-2'><OrderCard /></div>)
        }
      </div>
    </div>
  )
}

export default Orders