import Featured from "@/components/Featured";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SimpleSlider from "@/components/IndexPageCarousel";
import NewProducts from "@/components/NewProducts";;
import SaleBanner from "@/components/SaleBanner";
import Welcome from "@/components/Welcome";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";

export default function HomePage({newProducts,images}){
  console.log(images)
  return (
      <div>
        <Header />
        <Featured />
        <Welcome />r
        <SaleBanner />
        <SimpleSlider images={images} />
      </div>
      
  )
}

export async function getServerSideProps(){
  await mongooseConnect()
  const newProducts = await Product.find({}, null, {sort:{'_id':-1},limit:8})
  const images = newProducts.map(product => product.images[0])
  return {
    props:{
      images: images,
      newProducts: JSON.parse(JSON.stringify(newProducts))
    }
  }
}