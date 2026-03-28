import { useQueryClient } from "@tanstack/react-query";
import {
  useGetTeachers,
  useCreateTeacher,
  useUpdateTeacher,
  useDeleteTeacher,
  getGetTeachersQueryKey
} from "@workspace/api-client-react";

export function useTeachersApi() {
  const queryClient = useQueryClient();
  const queryKey = getGetTeachersQueryKey();

  const list = useGetTeachers();
  
  const create = useCreateTeacher({
    mutation: { onSuccess: () => queryClient.invalidateQueries({ queryKey }) }
  });
  
  const update = useUpdateTeacher({
    mutation: { onSuccess: () => queryClient.invalidateQueries({ queryKey }) }
  });
  
  const remove = useDeleteTeacher({
    mutation: { onSuccess: () => queryClient.invalidateQueries({ queryKey }) }
  });

  return { list, create, update, remove };
}
