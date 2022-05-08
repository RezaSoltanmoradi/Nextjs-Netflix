import React, { createContext, useState } from 'react'
import { Movie } from '../typings/typings'
import useAuth from '../hooks/useAuth'

type TableTypes = {
  productList: { product: Movie; starMovie: boolean }[]
  addProduct: (product: Movie, starMovie: boolean) => void
  removeProduct: (id: number) => void
}
export const TableContext = createContext<TableTypes>({
  productList: [],
  addProduct: (product, starMovie) => {},
  removeProduct: (id) => {},
})
interface tableContextProps {
  children: React.ReactNode
}
const ProvideTableContext = ({ children }: tableContextProps) => {
  const { user } = useAuth()

  let loadedProducts: { product: Movie; starMovie: boolean }[] = []
  if (!user) {
    loadedProducts = []
  }
  if (typeof window !== 'undefined') {
    const value = localStorage.getItem('products')
    loadedProducts = JSON.parse(value || '') || []
    console.log('loadedProducts', loadedProducts)
  }
  const [products, setProducts] = useState<
    { product: Movie; starMovie: boolean }[]
  >(loadedProducts || [])
  function updateStorage(key: string, value: any) {
    const changeToString = JSON.stringify(value)
    localStorage.setItem(key, changeToString)
  }
  const addProductHandler = (product: Movie, starMovie: boolean) => {
    const indexProduct = products.find((p) => p.product?.id === product.id)
    if (!indexProduct) {
      const updatedProducts: { product: Movie; starMovie: boolean }[] = [
        ...products,
        { product, starMovie },
      ]
      setProducts(updatedProducts)
      updateStorage('products', updatedProducts)
    }
  }
  const removeProductHandler = (productId: number) => {
    const indexProduct = products.find((p) => p.product?.id === productId)
    if (indexProduct) {
      const filterProduct = products.filter((p) => p.product?.id !== productId)

      const updatedProducts: { product: Movie; starMovie: boolean }[] = [
        ...filterProduct,
      ]
      setProducts(updatedProducts)
    }
  }

  const tableValue = {
    productList: products,
    addProduct: addProductHandler,
    removeProduct: removeProductHandler,
  }
  return (
    <TableContext.Provider value={tableValue}>{children}</TableContext.Provider>
  )
}
export default ProvideTableContext
