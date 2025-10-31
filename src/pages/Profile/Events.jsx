import React from 'react'
import EventCard from './EventCard'

function Events() {
  return (
    <div className='px-6 py-10'>
      <h2 className='text-3xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-6 text-center'>Events</h2>
      <div className='flex flex-wrap gap-6 justify-center'>
        {
          [1,1,1,1].map((item, index) => (
            <div key={index} className='rounded-2xl backdrop-blur-xl bg-white/10 border border-white/10 p-2'>
              <EventCard />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Events