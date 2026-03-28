import { useQueryClient } from "@tanstack/react-query";
import {
  getGetMeQueryKey,
  useGetMe,
  useLogin,
  useLogout,
} from "@workspace/api-client-react";

export function useAuth() {
  const queryClient = useQueryClient();
  const queryKey = getGetMeQueryKey();

  const me = useGetMe({
    query: {
      queryKey,
      retry: false,
      staleTime: 1000 * 60 * 5,
    },
  });

  const login = useLogin({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
      },
    },
  });

  const logout = useLogout({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
        queryClient.setQueryData(queryKey, null);
      },
    },
  });

  return {
    user: me.data,
    isLoading: me.isLoading,
    isError: me.isError,
    error: me.error,
    login,
    logout,
  };
}
