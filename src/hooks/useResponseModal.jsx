import { useContext } from "react";
import ResponseContext from "./../context/responseContext";

export const useResponseModal = (props) => {
  const { modal, setModal } = useContext(ResponseContext);

  return { modal, setModal };
};
