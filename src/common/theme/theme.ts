import { createTheme } from "@mui/material/styles"
import { ThemeMode } from "../../app/app-reducer"

export const getTheme = (themeMode: ThemeMode) => {
  return createTheme({
    palette: {
      mode: themeMode === "light" ? "light" : "dark",
      primary: {
        light: "#79A890A",
        main: "#466C58",
        dark: "#090D0B",
        contrastText: "#fff",
      },
      secondary: {
        main: "#D2A20D",
      },
    },
  })
}
