import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { useThemeStore } from '../../store/useThemeStore';
// import { useQuery } from '@tanstack/react-query'

const Layout = ({children}) => {
    const { theme } = useThemeStore();
  // const { data: authUser, isLoading } = useQuery({ queryKey: ["authUser"]});

  // console.log("auth user is in layout", authUser);
  return (
    <div className='min-h-screen' >
      <Navbar/>
      <main>
        {children}
      </main>
      {/* <Footer/> */}
    </div>
  )
}

export default Layout
