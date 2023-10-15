import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  chakra,
  InputLeftElement,
} from "@chakra-ui/react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { FaLock } from "react-icons/fa";
import * as yup from "yup";
import YupPassword from "yup-password";
import { useState } from "react";
YupPassword(yup);

const CFaLock = chakra(FaLock);

export const PasswordField = ({ isSubmitting, form, field }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <FormControl
      isInvalid={form.errors.password && form.touched.password}
      isDisabled={isSubmitting}>
      <FormLabel>Password</FormLabel>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          color="gray.300"
          children={<CFaLock color="gray.300" />}
        />
        <Input
          type={isOpen ? "text" : "password"} placeholder="Password"
          required
          {...field}
        />
        <InputRightElement>
          <IconButton
            variant="ghost"
            aria-label={isOpen ? "Mask password" : "Reveal password"}
            icon={isOpen ? <HiEyeOff /> : <HiEye />}
            onClick={() => {
              setIsOpen((open) => !open);
            }}
          />
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{form.errors.password}</FormErrorMessage>
    </FormControl>
  );
};
