import { useQueryClient } from "@tanstack/react-query";
import {
  useGetAnnouncements,
  useCreateAnnouncement,
  useUpdateAnnouncement,
  useDeleteAnnouncement,
  getGetAnnouncementsQueryKey
} from "@workspace/api-client-react";

export function useAnnouncementsApi() {
  const queryClient = useQueryClient();
  const queryKey = getGetAnnouncementsQueryKey();

  const list = useGetAnnouncements();
  
  const create = useCreateAnnouncement({
    mutation: { onSuccess: () => queryClient.invalidateQueries({ queryKey }) }
  });
  
  const update = useUpdateAnnouncement({
    mutation: { onSuccess: () => queryClient.invalidateQueries({ queryKey }) }
  });
  
  const remove = useDeleteAnnouncement({
    mutation: { onSuccess: () => queryClient.invalidateQueries({ queryKey }) }
  });

  return { list, create, update, remove };
}
