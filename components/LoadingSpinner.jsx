import React from 'react';
import {PuffLoader} from 'react-spinners'
import Center from './Center';

const LoadingSpinner = () => {
  return (
    <Center>
    <div className="loading-spinner">
      <PuffLoader color="#363636" />
    </div>
    </Center>
  );
};

export default LoadingSpinner;