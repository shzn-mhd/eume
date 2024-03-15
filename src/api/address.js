import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';

// utils
import { fetcher } from 'utils/axios';

export const endpoints = {
  key: 'api/address',
  list: '/list', // server URL
  insert: '/new', // server URL
  update: '/edit', // server URL
  delete: '/delete' // server URL
};

export function useGetAddress() {
  const { data, isLoading, error, isValidating } = useSWR(endpoints.key + endpoints.list, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      address: data?.address,
      addressLoading: isLoading,
      addressError: error,
      addressValidating: isValidating,
      addressEmpty: !isLoading && !data?.address?.length
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function insertAddress(newAddress) {
  // to update local state based on key
  mutate(
    endpoints.key + endpoints.list,
    (currentAddress) => {
      newAddress.id = currentAddress.address.length + 1;
      const addedAddress = [...currentAddress.address, newAddress];

      return {
        ...currentAddress,
        address: addedAddress
      };
    },
    false
  );

  // to hit server
  // you may need to refetch latest data after server hit and based on your logic
  //   const data = { newAddress };
  //   await axios.post(endpoints.key + endpoints.insert, data);
}

export async function updateAddress(addressId, updatedAddress) {
  // to update local state based on key
  mutate(
    endpoints.key + endpoints.list,
    (currentAddress) => {
      const newAddress = currentAddress.address.map((address) => (address.id === addressId ? { ...address, ...updatedAddress } : address));

      return {
        ...currentAddress,
        address: newAddress
      };
    },
    false
  );

  // to hit server
  // you may need to refetch latest data after server hit and based on your logic
  //   const data = { list: updatedAddress };
  //   await axios.post(endpoints.key + endpoints.update, data);
}

export async function deleteAddress(addressId) {
  // to update local state based on key
  mutate(
    endpoints.key + endpoints.list,
    (currentAddress) => {
      const nonDeletedAddress = currentAddress.address.filter((address) => address.id !== addressId);

      return {
        ...currentAddress,
        address: nonDeletedAddress
      };
    },
    false
  );

  // to hit server
  // you may need to refetch latest data after server hit and based on your logic
  //   const data = { addressId };
  //   await axios.post(endpoints.key + endpoints.delete, data);
}
