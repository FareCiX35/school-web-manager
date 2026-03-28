import { useQueryClient } from "@tanstack/react-query";
import {
  useGetStudents,
  useCreateStudentPost,
  useUpdateStudentPost,
  useDeleteStudentPost,
  getGetStudentsQueryKey
} from "@workspace/api-client-react";

export function useStudentsApi() {
  const queryClient = useQueryClient();
  const queryKey = getGetStudentsQueryKey();

  const list = useGetStudents();
  
  const create = useCreateStudentPost({
    mutation: { onSuccess: () => queryClient.invalidateQueries({ queryKey }) }
  });
  
  const update = useUpdateStudentPost({
    mutation: { onSuccess: () => queryClient.invalidateQueries({ queryKey }) }
  });
  
  const remove = useDeleteStudentPost({
    mutation: { onSuccess: () => queryClient.invalidateQueries({ queryKey }) }
  });

  return { list, create, update, remove };
}
