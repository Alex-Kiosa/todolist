import { RootState } from "./store"

// for typification
export const selectThemeMode = (state: RootState) => state.app.themeMode
