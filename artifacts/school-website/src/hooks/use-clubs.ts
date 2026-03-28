import { useQueryClient } from "@tanstack/react-query";
import {
  useGetClubs,
  useCreateClub,
  useUpdateClub,
  useDeleteClub,
  getGetClubsQueryKey
} from "@workspace/api-client-react";

export function useClubsApi() {
  const queryClient = useQueryClient();
  const queryKey = getGetClubsQueryKey();

  const list = useGetClubs();
  
  const create = useCreateClub({
    mutation: { onSuccess: () => queryClient.invalidateQueries({ queryKey }) }
  });
  
  const update = useUpdateClub({
    mutation: { onSuccess: () => queryClient.invalidateQueries({ queryKey }) }
  });
  
  const remove = useDeleteClub({
    mutation: { onSuccess: () => queryClient.invalidateQueries({ queryKey }) }
  });

  return { list, create, update, remove };
}
