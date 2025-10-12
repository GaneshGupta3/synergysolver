import { useSelector } from "react-redux";

export const useUser = () => {
  const { user, isLoggedIn } = useSelector((state) => state.authProvider);
  return { user, isLoggedIn };
};