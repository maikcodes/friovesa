import { generateNextCursor } from "../services/Pagination";
import { Order } from "../services/Order";
import { useInfiniteQuery } from "@tanstack/react-query";

async function fetchOrders({ customerId, page, perPage, orderBy }) {
  const order = new Order();
  const orders = await order.getCustomerOrders({
    customerId,
    page,
    perPage,
    orderBy,
  });

  const nextCursor = generateNextCursor(orders.pagination);

  return {
    categories: orders.data,
    nextCursor,
  };
}

function userOrders({ customerId, perPage, orderBy }) {
  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["orders", customerId],
      queryFn: async ({ pageParam }) =>
        await fetchOrders({ customerId, page: pageParam, perPage, orderBy }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

  return {
    isLoading,
    isError,
    orders: data?.pages.flatMap((page) => page.categories) ?? [],
    refetch,
    fetchNextPage,
    hasNextPage,
  };
}

export default userOrders;
