import { observer } from "mobx-react-lite";
import { useAuthStore } from "../context/authContext";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Controls = observer(() => {
  const authStore = useAuthStore();

  if (!authStore.isAuth) {
    return <></>;
  }

  return (
    <>
      <Sidebar />
      <Header />
    </>
  );
});

export default Controls;
