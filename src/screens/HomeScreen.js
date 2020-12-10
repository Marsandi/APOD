import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import moment from 'moment'
import { API_KEY } from '../api/api'

const HomeScreen = () => {
  const dateVal = moment().format('YYYY-MM-DD')
  const [mediaUrl, setMediaUrl] = useState('https://via.placeholder.com/500')
  const [loading, setLoading] = useState(true)
  const [mediaType, setMediaType] = useState('image')
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [date, setDate] = useState(dateVal)
  const [isValidForNext, setIsValidForNext] = useState(true)
  const [searchQuery, setSearchQuery] = useState(
    'https://www.google.com/search?q=NASA'
  )

  useEffect(() => {
    const fetchData = async () => {
      const mediaObj = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`
      )
      if (mediaObj.data.media_type === 'image') {
        setMediaType('image')
      } else if (mediaObj.data.media_type === 'video') {
        setMediaType('video')
      }
      setMediaUrl(mediaObj.data.url)
      setTitle(mediaObj.data.title)
      setDesc(mediaObj.data.explanation)
      const tempQuery =
        'https://www.google.com/search?q=' +
        mediaObj.data.title.replace(/ /g, '+')
      setSearchQuery(tempQuery)
      setLoading(false)

      const dayAfter = moment(date).add(1, 'days').format('YYYY-MM-DD')
      if (moment(dayAfter).isAfter(dateVal)) {
        setIsValidForNext(false)
      }
    }

    fetchData()
  }, [date, isValidForNext, dateVal])

  const nextHandler = (type) => {
    if (type === 'prev') {
      setDate(moment(date).subtract(1, 'days').format('YYYY-MM-DD'))
      setIsValidForNext(true)
      window.scrollTo(0, 0)
    } else {
      setDate(moment(date).add(1, 'days').format('YYYY-MM-DD'))
      window.scrollTo(0, 0)
    }
  }

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <>
          <div className='grid lg:grid-cols-2 md:px-10 lg:px-30 xl:px-30 2xl:px-55 font-body'>
            <div className='p-2 md:p-10 sm:mx-auto max-w-sm md:max-w-lg md:w-10/12'>
              <p className='text-md pb-2'>{date}</p>
              <p className='text-3xl py-5'>{title}</p>
              <p className='text-base'>{desc}</p>
              <div className='grid grid-cols-2 md:flex md:justify-center mt-5 md:mt-10 lg:gap-2 xl:gap-10'>
                <div>
                  <a
                    href={searchQuery}
                    target='_blank'
                    rel='noreferrer'
                    className='rounded py-2 px-6 ml-4 text-primary border-blue-800 border-2 hover:bg-blue-800 hover:text-white transition ease-out duration-500'
                  >
                    <span className='text-xs md:text-base'>Learn More</span>
                  </a>
                </div>
                <div>
                  <a
                    href={mediaUrl}
                    target='_blank'
                    rel='noreferrer'
                    className='rounded py-2 px-6 mr-4 text-primary bg-blue-800 hover:bg-white border-2 hover:border-blue-800 text-white hover:text-blue-800 transition ease-out duration-500'
                  >
                    <span className='text-xs md:text-base'>
                      View {mediaType === 'image' && <span>Image</span>}
                      {mediaType === 'video' && <span>Video</span>}
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div>
              {mediaType === 'image' && (
                <div>
                  <img
                    className='object-contain md:object-scale-down w-11/12 md:max-w-lg overflow-hidden md:overflow-visible py-10 md:pt-20 mx-auto'
                    src={mediaUrl}
                    alt='APOD'
                  />
                </div>
              )}
              {mediaType === 'video' && (
                <div>
                  <iframe
                    className='w-11/12 md:max-w-lg overflow-hidden md:overflow-visible py-10 md:pt-20 mx-auto'
                    title='video_of_the_day'
                    width='500'
                    height='400'
                    src={mediaUrl}
                  ></iframe>
                </div>
              )}
            </div>
          </div>
          <div className='flex justify-between md:grid md:grid-cols-2 lg:px-30 xl:px-60 font-body mb-10'>
            <div className='flex justify-start lg:pl-5'>
              <button
                onClick={() => {
                  nextHandler('prev')
                }}
                className='rounded py-2 px-4 md:px-8 m-2 md:m-4 text-md text-primary bg-blue-800 hover:bg-white border-2 hover:border-blue-800 text-white hover:text-blue-800 transition ease-out duration-500'
              >
                <svg
                  className='inline-block w-6 h-6 mr-3'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M10 19l-7-7m0 0l7-7m-7 7h18'
                  ></path>
                </svg>
                <span className='text-xs md:text-base'>Previous Day</span>
              </button>
            </div>
            <div className='flex justify-end lg:pr-10'>
              {isValidForNext && (
                <button
                  onClick={() => {
                    nextHandler('next')
                  }}
                  className='rounded py-2 px-4 md:px-8 m-2 md:m-4 text-md text-primary bg-blue-800 hover:bg-white border-2 hover:border-blue-800 text-white hover:text-blue-800 transition ease-out duration-500'
                >
                  <span className='text-xs md:text-base'>Next Day</span>
                  <svg
                    className='inline-block w-6 h-6 ml-3'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M14 5l7 7m0 0l-7 7m7-7H3'
                    ></path>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default HomeScreen
