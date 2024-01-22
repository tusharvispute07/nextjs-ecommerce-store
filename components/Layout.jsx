// Layout.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LoadingSpinner from './LoadingSpinner';
import Center from './Center';
import Footer from './Footer';
import PhoneNav from './PhoneNav';

const Layout = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
    };

    const handleComplete = () => {
      setLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <div className='wrapper-container'>
      <Center>
      {loading ? 
      (<LoadingSpinner />)
      :
      (
        <>
        {children}
      <PhoneNav />
      <Footer />
      </>
      )
    }
      </Center>
    </div>
  );
};

export default Layout;