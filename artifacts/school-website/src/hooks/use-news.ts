import { useQueryClient } from "@tanstack/react-query";
import {
  useGetNews,
  useCreateNews,
  useUpdateNews,
  useDeleteNews,
  getGetNewsQueryKey
} from "@workspace/api-client-react";

export function useNewsApi() {
  const queryClient = useQueryClient();
  const queryKey = getGetNewsQueryKey();

  const list = useGetNews();
  
  const create = useCreateNews({
    mutation: { onSuccess: () => queryClient.invalidateQueries({ queryKey }) }
  });
  
  const update = useUpdateNews({
    mutation: { onSuccess: () => queryClient.invalidateQueries({ queryKey }) }
  });
  
  const remove = useDeleteNews({
    mutation: { onSuccess: () => queryClient.invalidateQueries({ queryKey }) }
  });

  return { list, create, update, remove };
}
