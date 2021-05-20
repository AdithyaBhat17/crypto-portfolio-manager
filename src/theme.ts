import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    heading: "Poppins, sans-serif",
    body: "Poppins, sans-serif",
  },
  colors: {
    black: "#19243C",
    navyBlue: "#4F38F7",
    grey: "#EDF0F4",
    offWhite: "#F7FAFD",
  },
  styles: {
    global: {
      li: {
        listStyle: "none",
      },
      "*": {
        boxSizing: "border-box",
      },
      body: {
        backgroundColor: "#fff",
        color: "#19243C",
      },
      "a,li": {
        cursor: "pointer",
        color: "#19243c",
      },
    },
  },
});
