import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';

// project-import
import { fetcher } from 'utils/axios';

const countries = [
  { code: 'US', label: 'United States Dollar', currency: 'Dollar', prefix: '$' },
  { code: 'GB', label: 'United Kingdom Pound', currency: 'Pound', prefix: '£' },
  { code: 'IN', label: 'India Rupee', currency: 'Rupee', prefix: '₹' },
  { code: 'JP', label: 'Japan Yun', currency: 'Yun', prefix: '¥' }
];

const initialState = {
  isOpen: false,
  isCustomerOpen: false,
  open: false,
  country: countries[0],
  countries: countries,
  alertPopup: false
};

export const endpoints = {
  key: 'api/invoice',
  actions: 'actions',
  list: '/list', // server URL
  insert: '/insert', // server URL
  update: '/update', // server URL
  delete: '/delete' // server URL
};

export function useGetInvoice() {
  const { data, isLoading, error, isValidating } = useSWR(endpoints.key + endpoints.list, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      invoice: data?.invoice,
      invoiceLoading: isLoading,
      invoiceError: error,
      invoiceValidating: isValidating,
      invoiceEmpty: !isLoading && !data?.invoice?.length
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function insertInvoice(newInvoice) {
  // to update local state based on key
  mutate(
    endpoints.key + endpoints.list,
    (currentInvoice) => {
      newInvoice.id = currentInvoice.invoice.length + 1;
      const addedInvoice = [...currentInvoice.invoice, newInvoice];

      return {
        ...currentInvoice,
        invoice: addedInvoice
      };
    },
    false
  );

  // to hit server
  // you may need to refetch latest data after server hit and based on your logic
  //   const data = { newInvoice };
  //   await axios.post(endpoints.key + endpoints.insert, data);
}

export async function updateInvoice(invoiceId, updatedInvoice) {
  // to update local state based on key
  mutate(
    endpoints.key + endpoints.list,
    (currentInvoice) => {
      const newInvoice = currentInvoice.invoice.map((invoice) => (invoice.id === invoiceId ? { ...invoice, ...updatedInvoice } : invoice));

      return {
        ...currentInvoice,
        invoice: newInvoice
      };
    },
    false
  );

  // to hit server
  // you may need to refetch latest data after server hit and based on your logic
  //   const data = { list: updatedInvoice };
  //   await axios.post(endpoints.key + endpoints.update, data);
}

export async function deleteInvoice(invoiceId) {
  // to update local state based on key
  mutate(
    endpoints.key + endpoints.list,
    (currentInvoice) => {
      const nonDeletedInvoice = currentInvoice.invoice.filter((invoice) => invoice.id !== invoiceId);

      return {
        ...currentInvoice,
        invoice: nonDeletedInvoice
      };
    },
    false
  );

  // to hit server
  // you may need to refetch latest data after server hit and based on your logic
  //   const data = { invoiceId };
  //   await axios.post(endpoints.key + endpoints.delete, data);
}

export function useGetInvoiceMaster() {
  const { data, isLoading } = useSWR(endpoints.key + endpoints.actions, () => initialState, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      invoiceMaster: data,
      invoiceMasterLoading: isLoading
    }),
    [data, isLoading]
  );

  return memoizedValue;
}

export function handlerCustomerTo(isCustomerOpen) {
  // to update local state based on key
  mutate(
    endpoints.key + endpoints.actions,
    (currentInvoicemaster) => {
      return { ...currentInvoicemaster, isCustomerOpen };
    },
    false
  );
}

export function handlerCustomerFrom(open) {
  // to update local state based on key
  mutate(
    endpoints.key + endpoints.actions,
    (currentInvoicemaster) => {
      return { ...currentInvoicemaster, open };
    },
    false
  );
}

export function selectCountry(country) {
  // to update local state based on key
  mutate(
    endpoints.key + endpoints.actions,
    (currentInvoicemaster) => {
      return { ...currentInvoicemaster, country };
    },
    false
  );
}

export function handlerPreview(isOpen) {
  // to update local state based on key
  mutate(
    endpoints.key + endpoints.actions,
    (currentInvoicemaster) => {
      return { ...currentInvoicemaster, isOpen };
    },
    false
  );
}

export function handlerDelete(alertPopup) {
  // to update local state based on key
  mutate(
    endpoints.key + endpoints.actions,
    (currentInvoicemaster) => {
      return { ...currentInvoicemaster, alertPopup };
    },
    false
  );
}
