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
} from "@chakra-ui/react";

const AddProductPage = () => {
  return (
    <Container>
      <Stack spacing="24px" textAlign="center">
        <Text fontsize="36px">Create Product</Text>
        <FormControl>
          <Input placeholder="name" />
          <Input placeholder="price" />
          <Select placeholder="Category">
            <option value="option1">Option 1</option>
          </Select>
          <Input placeholder="description" />
          <Button colorScheme="teal" variant="outline">
            Add Image
          </Button>
          <FormLabel htmlFor="email-alerts" mb="0">
            Active
          </FormLabel>
          <Switch id="active" />
        </FormControl>
      </Stack>
    </Container>
  );
};
export default AddProductPage;
