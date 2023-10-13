import { Container, Text, FormControl, Input } from "@chakra-ui/react";
import SidebarWithHeader from "../components/sidebar";

const AddCashierPage = () => {
  return (
    <SidebarWithHeader>
      <Container>
        <Text fontSize="36px">Add Cashier</Text>
        <FormControl>
          <Input placeholder="Create Username" />
        </FormControl>
        <FormControl>
          <Input placeholder="Create Password" />
        </FormControl>
      </Container>
    </SidebarWithHeader>
  );
};
export default AddCashierPage;
