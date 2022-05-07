import React, { createContext, useState } from 'react'
import { Movie } from '../typings/typings'

// function getStorage(key:string){
//   if(typeof window!==undefined&& localStorage===window.localStorage){

//     const getProducts: string |null=localStorage.getItem(key || '')
//     const changeToObject:Movie[] | null=JSON.parse(getProducts||'')
//     return changeToObject
//   }

// }
// const loadedProducts= getStorage('products')
// console.log('loadedProducts',loadedProducts);
type TableTypes = {
  productList: { product: Movie | null; starMovie: boolean }[]
  addProduct: (product: Movie, starMovie: boolean) => void
  removeProduct: (id: number) => void
}

export const TableContext = createContext<TableTypes>({
  productList: [{ product: null, starMovie: false }],
  addProduct: (product, starMovie) => {},
  removeProduct: (id) => {},
})
interface tableContextProps {
  children: React.ReactNode
}
const ProvideTableContext = ({ children }: tableContextProps) => {
  const [products, setProducts] = useState<
    { product: Movie | null; starMovie: boolean }[]
  >([])
  function updateStorage(key: string, value: any) {
    const changeToString = JSON.stringify(value)
    localStorage.setItem(key, changeToString)
  }
  const addProductHandler = (product: Movie, starMovie: boolean) => {
    const indexProduct = products.find((p) => p.product?.id === product.id)
    if (!indexProduct) {
      const updatedProducts: { product: Movie | null; starMovie: boolean }[] = [
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

      const updatedProducts: { product: Movie | null; starMovie: boolean }[] = [
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
