import {useSelector} from "react-redux";
import {RootState} from "../../model/store";

// for typification
export const useAppSelector = useSelector.withTypes<RootState>()