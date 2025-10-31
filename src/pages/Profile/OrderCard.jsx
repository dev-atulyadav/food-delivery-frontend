import { Button, Card } from '@mui/material'
import React from 'react'

function OrderCard() {
    return (
        <Card className='flex justify-between items-center p-5 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/10'>
            <div className='flex items-center space-x-5'>
                <img className='h-16 w-16 rounded-xl object-cover' src="https://c4.wallpaperflare.com/wallpaper/234/543/684/food-pizza-wallpaper-preview.jpg" alt="" />
                <div>
                    <p className='text-white font-semibold'>Biriyani</p>
                    <p className='text-white/80'>Rs. 399.00</p>
                </div>
            </div>
            <div>
                <Button disabled variant='contained' sx={{
                    cursor: 'not-allowed',
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontWeight: 700,
                    background: 'linear-gradient(90deg, #22c55e, #16a34a)'
                }}>Completed</Button>
            </div>
        </Card>
    )
}

export default OrderCard