import React from 'react';
import { Spinner } from 'react-bootstrap';

export const Loading: React.FC = () => {
  return (
   <Spinner style={{position: "fixed", top: "50%", left: "50%"}} animation="border"/>
  );
};
