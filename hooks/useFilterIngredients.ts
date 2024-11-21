import { Api } from '@/services/api-client'
import { Ingredient } from '@prisma/client'
import React from 'react'
import { useSet } from 'react-use'

interface ReturnProps {
  ingredients: Ingredient[]
  loading: boolean
  selectedIds: Set<string>
  onAddId: (id: string) => void
}

export const useFilterIngrediens = (): ReturnProps => {
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([])
  const [loading, setLoading] = React.useState(false)

  const [selectedIds, {toggle }] = useSet(new Set<string>([]));

  React.useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoading(true)
        const ingredients = await Api.ingredients.getAll()
        setIngredients(ingredients)
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }

    fetchIngredients()
  }, [])

  return { ingredients, loading, selectedIds, onAddId: toggle }
}
