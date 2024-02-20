import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister';
import {QueryClient} from '@tanstack/react-query';
import {PersistQueryClientOptions} from '@tanstack/react-query-persist-client';

const CACHE_TIME = 1000 * 60 * 5;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: CACHE_TIME,
      retry: 2,
    },
  },
});

const asyncStoragePersister = createAsyncStoragePersister({
  key: 'vpa.react-query',
  storage: AsyncStorage,
  throttleTime: 2000,
});

export const persistOptions: Omit<PersistQueryClientOptions, 'queryClient'> = {
  persister: asyncStoragePersister,
  dehydrateOptions: {
    shouldDehydrateQuery: query =>
      Boolean(
        // We want to persist queries that have a `cacheTime` of above zero.
        query.gcTime !== 0 &&
          // We want to persist queries that have `persisterVersion` in their query key.
          (query.queryKey[2] as {persisterVersion?: number})?.persisterVersion,
      ),
  },
};
