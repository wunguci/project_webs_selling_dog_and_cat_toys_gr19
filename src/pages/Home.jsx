import Banner from "../components/Banner"
import SliderCategory from "../components/SliderCategory"
import MainLayout from "../layout/mainLayout"

const Home = () => {
  return (
    <MainLayout>
      <div className="text-red-500 max-w-[1350px] mx-auto">
        <div className="relative">
          <Banner/>
          <SliderCategory/>
        </div>
      </div>
    </MainLayout>
  )
}

export default Home