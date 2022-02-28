import React from "react";
import { ChakraProvider, ChakraProviderProps } from "@chakra-ui/provider";

// export type CustomThemeProps = {
//   props: ChakraProviderProps
// }

const CustomThemeProvider: React.FC<ChakraProviderProps> = (props) => {

  const {
    children,
    colorModeManager,
    portalZIndex,
    resetCSS = true,
    theme = {},
    environment,
    cssVarsRoot,
  } = props

  return (
    <ChakraProvider {...props}>
      {children}
    </ChakraProvider>
  )
}

export default CustomThemeProvider;