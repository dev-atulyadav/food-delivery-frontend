import React from 'react'
import { useSelector } from 'react-redux'
import RestaurantCard from '../Restaurant/RestaurantCard'

function Favorites() {

  const { favorites } = useSelector(state => state.auth)


  return (
    <div className='p-6'>
      {
        favorites.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {favorites?.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : <h1 className="text-center text-2xl mt-14 text-white/70">No favorites yet</h1>
      }
    </div>
  )
}

export default Favorites