import React from 'react'

const Header = () => {
  return (
    <>
      <div className='bg-gray-300 px-2 py-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:px-30 xl:px-60 font-body'>
          <div className='flex justify-start lg:pl-5 items-center'>
            <a
              className='text-lg inline-block'
              href='https://nasa-apod-webapp.netlify.app/'
            >
              <img
                className='inline-block h-20 w-auto p-2'
                src='https://api.nasa.gov/assets/img/favicons/favicon-192.png'
                alt='NASA'
              />
              <p className='text-md md:text-lg inline-block'>
                Picture of the Day
              </p>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
