import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

function EventCard() {

    const theme = useTheme()

    return (
        <Card sx={{ width: 290, borderRadius: 4, backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }} style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
            <CardMedia image='https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' sx={{ height: 220, width: '100%', borderTopLeftRadius: 16, borderTopRightRadius: 16 }} />
            <CardContent>
                <Typography variant='h6' className='font-extrabold' sx={{
                    background: 'linear-gradient(90deg, #f97316, #ef4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                }}>
                    Fast Food Festival
                </Typography>
                <Typography variant='body2' sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    50% off on all items
                </Typography>
                <div className='py-2 space-y-2'>
                    <p className='text-white/80'>{"Kandy"}</p>
                    <p style={{ color: '#60a5fa' }} className='text-sm'>February 14, 2024 12:00 AM</p>
                    <p style={{ color: '#f87171' }} className='text-sm'>February 14, 2024 12:00 AM</p>
                </div>
            </CardContent>
            {
                true && <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <IconButton size='small' sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        <DeleteIcon/>
                    </IconButton>
                </CardActions>
            }
        </Card>
    )
}

export default EventCard