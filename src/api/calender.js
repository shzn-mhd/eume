import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';

// project import
import { v4 as UIDV4 } from 'uuid';

// utils
import { fetcher } from 'utils/axios';

// ----------------------------------------------------------------------

export const endpoints = {
  key: 'api/calendar/events',
  add: '/add', // server URL
  udpate: '/update', // server URL
  delete: '/delete' // server URL
};

export function useGetEvents() {
  const { data, isLoading, error, isValidating } = useSWR(endpoints.key, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      events: data?.events,
      eventsLoading: isLoading,
      eventsError: error,
      eventsValidating: isValidating,
      eventsEmpty: !isLoading && !data?.length
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function createEvent(newEvent) {
  // to update local state based on key
  mutate(
    endpoints.key,
    (currentEvents) => {
      const addedEvents = [...currentEvents.events, { ...newEvent, id: UIDV4() }];

      return {
        ...currentEvents,
        events: addedEvents
      };
    },
    false
  );

  // to hit server
  // you may need to refetch latest data after server hit and based on your logic
  //   const data = { newEvent };
  //   await axios.post(endpoints.key + endpoints.add, data);
}

export async function updateEvent(eventId, updatedEvent) {
  // to update local state based on key
  mutate(
    endpoints.key,
    (currentEvents) => {
      const updatedEvents = currentEvents.events.map((event) => (event.id === eventId ? { ...event, ...updatedEvent } : event));

      return {
        ...currentEvents,
        events: updatedEvents
      };
    },
    false
  );

  // to hit server
  // you may need to refetch latest data after server hit and based on your logic
  //   const data = { newEvent };
  //   await axios.post(endpoints.key + endpoints.udpate, data);
}

export async function deleteEvent(eventId) {
  // to update local state based on key
  mutate(
    endpoints.key,
    (currentEvents) => {
      const nonDeletedEvent = currentEvents.events.filter((event) => event.id !== eventId);

      return {
        ...currentEvents,
        events: nonDeletedEvent
      };
    },
    false
  );

  // to hit server
  // you may need to refetch latest data after server hit and based on your logic
  //   const data = { newEvent };
  //   await axios.post(endpoints.key + endpoints.delete, data);
}
