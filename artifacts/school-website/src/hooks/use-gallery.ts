import { useQueryClient } from "@tanstack/react-query";
import {
  useGetGallery,
  useCreateGalleryItem,
  useDeleteGalleryItem,
  getGetGalleryQueryKey
} from "@workspace/api-client-react";

export function useGalleryApi() {
  const queryClient = useQueryClient();
  const queryKey = getGetGalleryQueryKey();

  const list = useGetGallery();
  
  const create = useCreateGalleryItem({
    mutation: { onSuccess: () => queryClient.invalidateQueries({ queryKey }) }
  });
  
  const remove = useDeleteGalleryItem({
    mutation: { onSuccess: () => queryClient.invalidateQueries({ queryKey }) }
  });

  return { list, create, remove };
}
