import { useEffect, useState } from "react"
import axios from "axios"

export const request = {
    getWeather: {
    method: 'GET',
    url: (lat,lng) =>
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m`,
  },
}

export function useFetch(options) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const defaultHeaders = {
      Accept: 'application/json, application/xml',
    }

    const source = axios.CancelToken.source()

    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios.request({
          ...options,
          headers: {
            ...defaultHeaders,
            ...(options?.headers || {}),
          },
          cancelToken: source.token,
        })
        setData(response.data)
        setError(false)
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request canceled:', err.message)
        } else {
          setError(err.message)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    return () => {
      source.cancel('Operation canceled due to new request.')
    }
  }, [options])

  return { loading, data, error }
}