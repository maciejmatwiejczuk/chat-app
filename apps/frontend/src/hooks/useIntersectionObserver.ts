import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import { useRef, useCallback } from 'react';

export function useIntersectionObserver<
  T extends HTMLElement,
  U extends HTMLElement
>(query: UseInfiniteQueryResult<InfiniteData<unknown>>) {
  const intObserver = useRef<IntersectionObserver>();
  const observerRootRef = useRef<U>(null);
  const lastItemRef = useCallback(
    (item: T) => {
      if (query.isFetchingNextPage) {
        return;
      }

      if (intObserver.current) {
        intObserver.current.disconnect();
      }

      intObserver.current = new IntersectionObserver(
        (items) => {
          if (items[0].isIntersecting && query.hasNextPage) {
            query.fetchNextPage();
          }
        },
        {
          root: observerRootRef.current,
        }
      );

      if (item) intObserver.current.observe(item);
    },
    [query]
  );

  return { lastItemRef, observerRootRef };
}
