import { generateNextCursor } from "../services/Pagination";
import { Product } from "../services/Product";
import { useInfiniteQuery } from "@tanstack/react-query";

async function fetchProductsByIds({ page, perPage, relatedIds }) {
  const product = new Product();
  const products = await product.getProductsByIds({
    page,
    perPage,
    ids: relatedIds,
  });

  const nextCursor = generateNextCursor(products.pagination);

  return {
    products: products.data,
    nextCursor,
  };
}

function useRelatedProducts({ perPage, relatedIds, productId }) {
  /**
   *  staleTime and gcTime are set to 0 to ensure that the data is always fresh.
   */
  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["related_products", productId],
      queryFn: async ({ pageParam }) =>
        await fetchProductsByIds({ page: pageParam, perPage, relatedIds }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      staleTime: 0,
      gcTime: 0,
    });

  return {
    isLoading,
    isError,
    products: data?.pages.flatMap((page) => page.products) ?? [],
    refetch,
    fetchNextPage,
    hasNextPage,
  };
}

export default useRelatedProducts;
