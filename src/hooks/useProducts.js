import { generateNextCursor } from "../services/Pagination";
import { Product } from "../services/Product";
import { useInfiniteQuery } from "@tanstack/react-query";

async function fetchProducts({ category, page, perPage, orderBy }) {
  const product = new Product();
  const products = await product.getProducts({
    category,
    page,
    perPage,
    orderBy,
  });

  const nextCursor = generateNextCursor(products.pagination);

  return {
    products: products.data,
    nextCursor,
  };
}

function useProducts({ category, perPage, orderBy }) {
  /**
   *  staleTime and gcTime are set to 0 to ensure that the data is always fresh.
   */
  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["products", category],
      queryFn: async ({ pageParam }) =>
        await fetchProducts({ category, page: pageParam, perPage, orderBy }),
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

export default useProducts;
