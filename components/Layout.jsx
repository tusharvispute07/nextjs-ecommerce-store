import Center from "./Center";
import Footer from "./Footer";
import PhoneNav from "./PhoneNav";

export default function Layout({children}){

    return(
        <div className='wrapper-container'>
        <Center>
            {children}
            <PhoneNav />
            <Footer />
        </Center>
        </div>
    )
}