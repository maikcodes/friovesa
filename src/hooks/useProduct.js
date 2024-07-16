import { Product } from "../services/Product";
import { useEffect, useState } from "react";

function useProduct({ id }) {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const _product = new Product();

      setIsLoading(true);
      setIsError(false);

      try {
        const productData = await _product.getProduct({ id });
        setProduct(productData);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return {
    product,
    isLoading,
    isError,
  };
}

export default useProduct;
