import { AccountCircle } from '@mui/icons-material'
import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function UserProfile() {

  const dispatch = useDispatch()
  const { user, token } = useSelector(state => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      toast.success("Logged out successfully")
      setTimeout(() => {
        navigate('/account/login'); 
      }, 2000);
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className=' min-h-[80vh] flex flex-col justify-center items-center px-6'>
      <div className=' relative w-full max-w-xl rounded-2xl p-10 backdrop-blur-xl bg-white/10 border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex flex-col items-center justify-center'>
          <div className='absolute -top-16 w-28 h-28 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center border-4 border-white/20'>
            <AccountCircle sx={{ fontSize: '4rem', color: 'white' }}/>
          </div>
          <h1 className=' mt-16 py-2 text-3xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent'>{user?.userName}</h1>
          <p className='text-white/80'>{user?.email}</p>
          <Button variant='contained' sx={{ mt: 4, px: 4, py: 1.5, borderRadius: '12px', textTransform: 'none', fontWeight: 700, background: 'linear-gradient(90deg, #f97316, #ef4444)' }} onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  )
}

export default UserProfile