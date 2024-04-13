import { config } from '@repo/app-config'
import personApi from '../api/personApi'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { setPersons } from '../store/person/personStore'

const fetchPersons = async () => {
  const persionApiRef = personApi(config.personBff.api.path)
  const response = await persionApiRef.fetchPersonDetails()
  return response
}

const useGetPersonDetails = () => {
  const { isSuccess, data } = useQuery({
    queryKey: ['getPersonDetails'], // unique cache key
    queryFn: fetchPersons, // function
    refetchOnMount: true // true if we're in mount
  })

  const updatePersonStore = () => {
    if (isSuccess) {
      setPersons(data.persons)
    }
  }

  useEffect(() => {
    let isCancelled = false
    if (!isCancelled) {
      updatePersonStore()
    }
    // Clean up function to avoid race conditions
    return () => {
      isCancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data])
}

export default useGetPersonDetails
