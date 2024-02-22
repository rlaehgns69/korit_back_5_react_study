import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

function ProductPage(props) {
  
  const params  = useParams();
  console.log(params.productId);
  
  const products = useMemo(() => [
    {
      productId: 1,
      productName: "상품1"
    },
    {
      productId: 2,
      productName: "상품2"
    },
    {
      productId: 3,
      productName: "상품3"
    }
  ], []);

  const product = useMemo(() => products.filter, [params.productId]);

  return (
    <div>
      
    </div>
  );
}

export default ProductPage;