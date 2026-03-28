import { useQueryClient } from "@tanstack/react-query";
import { 
  useGetMe, 
  useLogin, 
  useLogout, 
  getGetMeQueryKey 
} from "@workspace/api-client-react";

export function useAuth() {
  const queryClient = useQueryClient();
  const queryKey = getGetMeQueryKey();

  const me = useGetMe({ 
    query: { 
      retry: false,
      staleTime: 1000 * 60 * 5, // 5 mins
    } 
  });

  const login = useLogin({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
      }
    }
  });

  const logout = useLogout({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
        queryClient.setQueryData(queryKey, null);
      }
    }
  });

  return { 
    user: me.data, 
    isLoading: me.isLoading, 
    isError: me.isError,
    login, 
    logout 
  };
}
