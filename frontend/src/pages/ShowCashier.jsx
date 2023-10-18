import { Box, VStack, HStack, Heading, Spacer, Button } from "@chakra-ui/react";
import SidebarWithHeader from "../components/sidebar";
const ShowCashierPage = () => {
  return (
    <SidebarWithHeader>
      <Box
        className="App"
        p={5}
        shadow="md"
        borderWidth="1px"
        borderRadius="md"
        bg="white"
      >
        <VStack spacing={5} align="stretch">
          <HStack w="full">
            <Heading as="h1" size="xl">
              Show Cashier
            </Heading>
            <Spacer />
          </HStack>
        </VStack>
      </Box>
    </SidebarWithHeader>
  );
};

export default ShowCashierPage;
