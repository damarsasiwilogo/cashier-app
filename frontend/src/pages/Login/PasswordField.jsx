import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
  chakra,
  InputLeftElement,
  useToast,
} from "@chakra-ui/react";
import { forwardRef, useRef } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Field, Form, Formik } from "formik";
import { FaLock } from "react-icons/fa";
import { useDispatch } from "react-redux";
import api from "../../api";
import { login } from "../../slices/userSlice";
import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

const CFaLock = chakra(FaLock);

export const PasswordField = forwardRef((props, ref) => {
  const { isOpen, onToggle } = useDisclosure();
  const inputRef = useRef(null);
  const mergeRef = useMergeRefs(inputRef, ref);
  const onClickReveal = () => {
    onToggle();
    if (inputRef.current) {
      inputRef.current.focus({
        preventScroll: true,
      });
    }
  };

  const toast = useToast();
  const dispatch = useDispatch();

  //connect db.json when registered user submit on login modal
  const handleLogin = (values, forms) => {
    api
      .get(`/auth?q=${values.username}`)
      .then((res) => {
        const { data } = res;
        const filteredUser = data
          .filter((user) => {
            return user.username === values.username;
          })
          .filter((user) => user.password === values.password);
        if (filteredUser.length === 0) {
          toast({
            status: "error",
            title: "Login failed",
            description: "incorrect username or password",
            isClosable: true,
            duration: 5000,
          });
          forms.setSubmitting(false);
          return;
        }
        const [userProfile] = filteredUser;
        dispatch(login(userProfile));

        toast({
          status: "success",
          title: "Login is success",
          isClosable: true,
          duration: 1000,
          onCloseComplete: () => {
            forms.resetForm();
          },
        });
      })
      .catch((error) => {
        toast({
          status: "error",
          title: "Something wrong",
          description: error.message,
          isClosable: true,
          duration: 5000,
        });
        forms.resetForm();
      });
  };

  const loginSchema = yup.object().shape({
    username: yup.string().required("Username cant be empty"),
    password: yup.string().required("Password cant be empty"),
  });
  return (
    <Formik
      initialValues={{ password: "" }}
      validationSchema={loginSchema}
      onSubmit={handleLogin}>
      {({ isSubmitting }) => (
        <Form>
          <Field name="password">
            {({ field, form }) => (
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
                    id="password"
                    ref={mergeRef}
                    name="password"
                    type={isOpen ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    {...field}
                    {...props}
                  />
                  <InputRightElement>
                    <IconButton
                      variant="ghost"
                      aria-label={isOpen ? "Mask password" : "Reveal password"}
                      icon={isOpen ? <HiEyeOff /> : <HiEye />}
                      onClick={onClickReveal}
                    />
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
        </Form>
      )}
    </Formik>
  );
});
PasswordField.displayName = "PasswordField";
