import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import { API_KEY } from '../api/api'

const HomeScreen = () => {
  const [mediaUrl, setMediaUrl] = useState('https://via.placeholder.com/500')
  const [loading, setLoading] = useState(true)
  const [mediaType, setMediaType] = useState('image')
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [date, setDate] = useState('')
  const [searchQuery, setSearchQuery] = useState(
    'https://www.google.com/search?q=NASA'
  )

  useEffect(() => {
    const fetchData = async () => {
      const mediaObj = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`
      )
      console.log(mediaObj)
      if (mediaObj.data.media_type === 'image') {
        setMediaType('image')
      } else if (mediaObj.data.media_type === 'video') {
        setMediaType('video')
      }
      setMediaUrl(mediaObj.data.url)
      setTitle(mediaObj.data.title)
      setDesc(mediaObj.data.explanation)
      setDate(mediaObj.data.date)
      const tempQuery =
        'https://www.google.com/search?q=' +
        mediaObj.data.title.replace(/ /g, '+')
      setSearchQuery(tempQuery)
      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <>
          <div className='grid lg:grid-cols-2 lg:px-30 xl:px-60 font-body'>
            <div className='p-10 sm:mx-auto'>
              <p className='text-md pb-2'>{date}</p>
              <p className='text-3xl py-5'>{title}</p>
              <p className='text-base'>{desc}</p>
              <div className='flex justify-center mt-3'>
                <a
                  href={searchQuery}
                  className='rounded py-2 px-8 m-4 text-md text-primary border-blue-800 border-2 hover:bg-blue-800 hover:text-white transition ease-out duration-500'
                >
                  Learn More
                </a>
                <a
                  href={mediaUrl}
                  className='rounded py-2 px-8 m-4 text-md text-primary bg-blue-800 hover:bg-white border-2 hover:border-blue-800 text-white hover:text-blue-800 transition ease-out duration-500'
                >
                  View {mediaType === 'image' && <span>Image</span>}
                  {mediaType === 'video' && <span>Video</span>}
                </a>
              </div>
            </div>
            <div className='p-10 md:pt-20 sm:mx-auto'>
              {mediaType === 'image' && (
                <div>
                  <img
                    className='object-contain md:object-scale-down w-auto h-auto mx-auto max-w-md'
                    src={mediaUrl}
                    alt='APOD'
                  />
                </div>
              )}
              {mediaType === 'video' && (
                <div>
                  <iframe
                    title='video_of_the_day'
                    width='500'
                    height='400'
                    src={mediaUrl}
                  ></iframe>
                </div>
              )}
            </div>
          </div>
          <div className='grid grid-cols-2 lg:px-30 xl:px-60 font-body'>
            <div className='flex justify-start lg:pl-5'>
              <a
                href={searchQuery}
                className='rounded py-2 px-8 m-4 text-md text-primary bg-blue-800 hover:bg-white border-2 hover:border-blue-800 text-white hover:text-blue-800 transition ease-out duration-500'
              >
                <svg
                  class='inline-block w-6 h-6 mr-3'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M10 19l-7-7m0 0l7-7m-7 7h18'
                  ></path>
                </svg>
                <span>Previous Day</span>
              </a>
            </div>
            <div className='flex justify-end lg:pr-10'>
              <a
                href={searchQuery}
                className='rounded py-2 px-8 m-4 text-md text-primary bg-blue-800 hover:bg-white border-2 hover:border-blue-800 text-white hover:text-blue-800 transition ease-out duration-500'
              >
                <span>Next Day</span>
                <svg
                  class='inline-block w-6 h-6 ml-3'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M14 5l7 7m0 0l-7 7m7-7H3'
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default HomeScreen
