import Featured from "@/components/Featured";
import Header from "@/components/Header";
import SimpleSlider from "@/components/IndexPageCarousel";
import SaleBanner from "@/components/SaleBanner";
import Welcome from "@/components/Welcome";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";
import { Setting } from "@/models/setting";

export default function HomePage({images,ids, settingsData}){
  return (
      <div>
        <Header />
        <Featured settingsData={settingsData}/>
        <Welcome />r
        <SaleBanner settingsData={settingsData} />
        <SimpleSlider images={images} ids={ids} />
      </div>
      
  )
}

export async function getServerSideProps(){
  await mongooseConnect()
  const settingsData = await Setting.getSingleton()
  const newProducts = await Product.find({}, null, {sort:{'_id':-1},limit:8})
  const images = newProducts.map(product => product.images[0])
  const ids = newProducts.map(product => product._id.toString())
  return {
    props:{
      images: images,
      ids:ids,
      settingsData: JSON.parse(JSON.stringify(settingsData)),
    }
  }
}