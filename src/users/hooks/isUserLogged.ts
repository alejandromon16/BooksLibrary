import { useQuery } from "@blitzjs/rpc"
import getCurrentUser from "src/users/queries/getCurrentUser"

export const useUserLogged = () => {
  const [user] = useQuery(getCurrentUser, null)
  if(user) return true;

  return false;
}
