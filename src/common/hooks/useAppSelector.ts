import { useSelector } from "react-redux"
import { RootState } from "../../app/store"

// for typification
export const useAppSelector = useSelector.withTypes<RootState>()
