import { Link, useParams } from 'react-router-dom'
import MainLayout from '../layout/mainLayout'
import image1 from '../assets/images/image1.jpg'
import SliderCategory from '../components/SliderCategory'
import Filter from '../components/Filter'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import { useEffect } from 'react'
import { featchProductByCategoryName } from '../stores/productSlice'


function Category() {

  const { productByCateoty: products } = useSelector((state) => state.products)
  const { slug } = useParams()
  const dispatch = useDispatch()

  console.log(products);
  
  
  useEffect(()=>{
    dispatch(featchProductByCategoryName(slug))
  }, [dispatch, slug])

  if(!products){
    return <div>
      loading
    </div>
  }

  return (
    <MainLayout>
      <div className="relative">
        <img className="h-32 md:w-full md:h-full" src={image1} alt="" />
        <div className="absolute top-1/4 right-1/2 translate-x-1/2 -translate-y-1/2 text-base md:text-[20px] font-bold text-center">
          <h1 style={{ color: "white" }} className="mb-4 text-2xl hidden md:block text-white">{products[0]?.category_id?.name}</h1>
          <div>
            <Link to="/" className="hover:text-[#c49a6c] text-white">Trang chủ</Link> 
            <span className='text-white'> &gt; </span>
            <span className=" font-semibold text-[#c49a6c]">{products[0]?.category_id?.name}</span>
          </div>
        </div>
        <SliderCategory />
      </div>
      <div className='max-w-[1200px] mx-auto flex gap-3'>
        <div className='w-1/4'>
          <Filter />
        </div>
        <div className='w-3/4'>
          <div className='grid grid-cols-4 gap-3'>
            {
              products?.map((product, index) => (
                <div key={index}>
                  <Product product={product}/>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Category