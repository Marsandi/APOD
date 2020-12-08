import React from 'react'

const Header = () => {
  return (
    <>
      <nav className='bg-gray-300'>
        <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
          <div className='relative flex items-center justify-between h-16'>
            <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
              <div className='flex-shrink-0 flex items-center'>
                <img
                  className='block h-12 w-auto p-2'
                  src='https://api.nasa.gov/assets/img/favicons/favicon-192.png'
                  alt='NASA'
                />
                <h1>Astronomy Picture of the Day</h1>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
