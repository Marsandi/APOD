import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import { API_KEY } from '../api/api'

const HomeScreen = () => {
  const [imgUrl, setImgUrl] = useState('https://via.placeholder.com/500')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const imgobj = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`
      )
      console.log(imgobj)
      setLoading(false)
      setImgUrl(imgobj.data.url)
    }

    fetchData()
  }, [])

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <>
          <div>
            <img
              className='object-contain md:object-scale-down w-auto h-auto mx-auto max-w-md'
              src={imgUrl}
              alt='APOD'
            />
          </div>
        </>
      )}
    </>
  )
}

export default HomeScreen
