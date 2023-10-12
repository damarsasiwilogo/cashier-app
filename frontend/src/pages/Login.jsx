import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import Logo from "../images/Kiefcie-removebg.png";
import { OAuthButtonGroup } from "./Login/OAuthButtonGroup";
import { PasswordField } from "./Login/PasswordField";

export const Login = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}>
    <Container
      maxW="lg"
      py={{
        base: "12",
        md: "24",
      }}
      px={{
        base: "0",
        sm: "8",
      }}>
      <Stack spacing="8">
        <Stack
          spacing="6"
          alignItems="center">
          <Image
            src={Logo}
            boxSize="300px"
          />
          <Stack
            spacing={{
              base: "2",
              md: "3",
            }}
            textAlign="center">
            <Heading
              size={{
                base: "xs",
                md: "sm",
              }}>
              Log in to your account
            </Heading>
          </Stack>
        </Stack>
        <Box
          py={{
            base: "0",
            sm: "8",
          }}
          px={{
            base: "4",
            sm: "10",
          }}
          bg={{
            base: "transparent",
            sm: "bg.surface",
          }}
          boxShadow={{
            base: "none",
            sm: "md",
          }}
          borderRadius={{
            base: "none",
            sm: "xl",
          }}>
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Username/Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                />
              </FormControl>
              <PasswordField />
            </Stack>
            <HStack justify="space-between">
              <Checkbox
                defaultChecked
                colorScheme="red">
                Remember me
              </Checkbox>
              <Button
                variant="text"
                size="sm">
                Forgot password?
              </Button>
            </HStack>
            <Stack spacing="6">
              <Button
                loadingText="Signing In"
                type="submit"
                colorScheme="red">
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  </div>
);
