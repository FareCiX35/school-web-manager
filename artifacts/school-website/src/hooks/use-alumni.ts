import { useQueryClient } from "@tanstack/react-query";
import {
  useGetAlumni,
  useCreateAlumnus,
  useUpdateAlumnus,
  useDeleteAlumnus,
  getGetAlumniQueryKey
} from "@workspace/api-client-react";

export function useAlumniApi() {
  const queryClient = useQueryClient();
  const queryKey = getGetAlumniQueryKey();

  const list = useGetAlumni();
  
  const create = useCreateAlumnus({
    mutation: { onSuccess: () => queryClient.invalidateQueries({ queryKey }) }
  });
  
  const update = useUpdateAlumnus({
    mutation: { onSuccess: () => queryClient.invalidateQueries({ queryKey }) }
  });
  
  const remove = useDeleteAlumnus({
    mutation: { onSuccess: () => queryClient.invalidateQueries({ queryKey }) }
  });

  return { list, create, update, remove };
}
