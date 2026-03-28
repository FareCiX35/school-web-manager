import { useQueryClient } from "@tanstack/react-query";
import {
  useGetContacts,
  useSubmitContact,
  getGetContactsQueryKey
} from "@workspace/api-client-react";

export function useContactApi() {
  const queryClient = useQueryClient();
  const queryKey = getGetContactsQueryKey();

  const list = useGetContacts();
  
  const submit = useSubmitContact({
    mutation: { onSuccess: () => queryClient.invalidateQueries({ queryKey }) }
  });

  return { list, submit };
}
