import { useQueryClient } from "@tanstack/react-query";
import {
  useGetEvents,
  useCreateEvent,
  useUpdateEvent,
  useDeleteEvent,
  getGetEventsQueryKey
} from "@workspace/api-client-react";

export function useEventsApi() {
  const queryClient = useQueryClient();
  const queryKey = getGetEventsQueryKey();

  const list = useGetEvents();
  
  const create = useCreateEvent({
    mutation: { onSuccess: () => queryClient.invalidateQueries({ queryKey }) }
  });
  
  const update = useUpdateEvent({
    mutation: { onSuccess: () => queryClient.invalidateQueries({ queryKey }) }
  });
  
  const remove = useDeleteEvent({
    mutation: { onSuccess: () => queryClient.invalidateQueries({ queryKey }) }
  });

  return { list, create, update, remove };
}
