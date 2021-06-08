import { useContext } from "react";
import PointsContext from "./../context/pointsContext";

export const usePointsModal = (props) => {
  const { points, setPoints } = useContext(PointsContext);

  return { points, setPoints };
};
