import {
  Container,
  FormControl,
  Input,
  Stack,
  Text,
  Switch,
  FormLabel,
  Select,
  Button,
  Box,
  SidebarWithHeader,
} from "@chakra-ui/react";
import SidebarWithHeader from "../components/sidebar";

const AddProductPage = () => {
  return (
    <SidebarWithHeader>
      <Stack spacing="24px" textAlign="center">
        <Text fontsize="36px">Create Product</Text>
        <FormControl>
          <Input placeholder="name" />
        </FormControl>
        <FormControl>
          <Input placeholder="price" />
        </FormControl>
        <FormControl>
          <Select placeholder="Category">
            <option value="option1">Option 1</option>
          </Select>
        </FormControl>
        <FormControl>
          <Input placeholder="description" />
        </FormControl>
        <FormControl
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Button colorScheme="red">Add Image</Button>
          <Box display="flex">
            <FormLabel htmlFor="email-alerts" mb="0">
              Active
            </FormLabel>
            <Switch id="active" />
          </Box>
        </FormControl>
      </Stack>
    </SidebarWithHeader>
  );
};
export default AddProductPage;
