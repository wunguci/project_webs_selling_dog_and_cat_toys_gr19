import Banner from "../components/Banner"
import SliderCategory from "../components/SliderCategory"
import MainLayout from "../layout/mainLayout"
import ListProduct from "../components/ListProduct"

const Home = () => {
  return (
    <MainLayout>
      <div className="relative mt-10">
          <Banner/>
          <SliderCategory/>
      </div>
      <div className="max-w-[1350px] mx-auto flex flex-col gap-20">
        <ListProduct />
        <ListProduct style/>
      </div>
    </MainLayout>
  )
}

export default Home