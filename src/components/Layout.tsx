import { Box } from "@chakra-ui/layout";
import { memo, ReactChild } from "react";

interface LayoutProps {
  children: ReactChild | ReactChild[];
}

function Layout({ children }: LayoutProps) {
  return <Box px={{ base: "5", sm: 10, md: 20 }}>{children}</Box>;
}

export default memo(Layout);
