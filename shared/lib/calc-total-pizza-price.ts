import { Ingredient, ProductItem } from '@prisma/client'
import { PizzaSize, PizzaType } from '../constants/pizza'

/**
 * Функция для подсчета общей стоимости пиццы
 * @example calcTotalPizzaPrice(1,20,items,ingredients,selectedIngredients)
 * 
 * @param type - тип теста выбранной пиццы
 * @param size - размер выбранной пиццы
 * @param items - список вариаций пицц
 * @param ingredients - список ингредиентов
 * @param selectedIngredients - выбранные ингредиенты
 * 
 * @returns number - получаем общую стоимость
 */



export const calcTotalPizzaPrice = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number> 
) => {
  const pizzaPrice =
    items.find((item) => item.pizzaType === type && item.size === size)
      ?.price || 0

  const totalIngredientPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0)

  return pizzaPrice + totalIngredientPrice
}
