import { useQueryClient } from "@tanstack/react-query";
import {
  useGetSettings,
  useUpdateSettings,
  getGetSettingsQueryKey
} from "@workspace/api-client-react";

export function useSettingsApi() {
  const queryClient = useQueryClient();
  const queryKey = getGetSettingsQueryKey();

  const get = useGetSettings();
  
  const update = useUpdateSettings({
    mutation: { onSuccess: () => queryClient.invalidateQueries({ queryKey }) }
  });

  return { get, update };
}
