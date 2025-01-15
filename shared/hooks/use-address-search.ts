import React from 'react'
import axios from 'axios'

const API_KEY = 'dQiRMapR-_zEuO_DO4_tpGTgfsLVMWSsaJnmNm6jcRU'

interface AutoSuggestItem {
  title: string
  id: string
  resultType: string
  address?: {
    label?: string
    countryCode?: string
    locality?: string
    street?: string
    posalCode?: string
  }
  position?: {
    lat: number
    lng: number
  }
  distance?: number
}

interface UseAutosuggestProps {
  query: string
  city: string
  language?: string
}

interface UseAutosuggestReturn {
  data: AutoSuggestItem[]
  loading: boolean
  error: string | null
}

interface Item {
  title: string
}

export const useAddressSearch = ({
  query,
  city,
  language = 'uk-UA',
}: UseAutosuggestProps): UseAutosuggestReturn => {
  const [data, setData] = React.useState<AutoSuggestItem[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!query || !city) return

    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await axios.get(
          'https://autosuggest.search.hereapi.com/v1/autosuggest',
          {
            params: {
              limit: 10,
              q: query,
              in: city,
              lang: language,
              apiKey: API_KEY,
            },
          }
        )

        const mapData = response.data.items
          .map((item: Item) => ({
            title: item.title,
          }))
          .filter(
            (
              item: { title: string },
              index: number,
              self: { title: string }[]
            ) => {
              return index === self.findIndex((t) => t.title === item.title)
            }
          )
        setData(mapData || [])
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Неизвестная ошибка')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [query, city, language])

  return { data, loading, error }
}
