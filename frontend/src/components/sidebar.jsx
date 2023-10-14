import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  Image,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  FiHome,
  FiPlusSquare,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiCalendar,
} from "react-icons/fi";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";
import { logout } from "../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

const LinkItems = [
  { name: "Home", icon: FiHome, ref: "/" },
  { name: "Add Cashier", icon: FiPlusSquare },
  { name: "Add Product", icon: FiPlusSquare, ref: "/add-product" },
  { name: "Show Product", icon: FiCalendar, ref: "/show-product" },
  { name: "Settings", icon: FiSettings },
];
// check if visitor is loogged in or not

const SidebarContent = ({ onClose, ...rest }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = user.id; // Replace with the actual user ID
        const response = await api.get(`/auth/account/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setUser(response.data); // Set the fetched user data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex
        h="20"
        alignItems="center"
        mx="8"
        justifyContent="space-between">
        <Image
          src="./Kiefcie.png"
          alt="Kiefcie Logo"
          boxSize="150px"
        />
        <CloseButton
          display={{ base: "flex", md: "none" }}
          onClick={onClose}
        />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          href={link.ref}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, href, children, ...rest }) => {
  return (
    <Box
      as={Link}
      to={href}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, needLogin, ...rest }) => {
  const [user, setUser] = useState([]);
  const isLoggedIn = useSelector((state) => state.account.isLoggedIn);
  const baseURL = 'localhost:8000';
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedProfile = localStorage.getItem("profile");
        const userId = storedProfile ? JSON.parse(storedProfile).id : null;

        // If userId is not available, log an error and return to prevent API call
        if (!userId) {
          console.error("User ID not available");
          return;
        }

        const response = await api.get(`/auth/account/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.ok) {
          setUser(response.data.data);
        } else {
          console.error("Error fetching user data:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (needLogin && !isLoggedIn) {
      navigate("/Login");
    }
  }, [needLogin, isLoggedIn]);

  const backGround = useColorModeValue("white", "gray.900");

  return (
    <>
      {isLoggedIn ? (
        <Flex
          ml={{ base: 0, md: 60 }}
          px={{ base: 4, md: 4 }}
          height="20"
          alignItems="center"
          bg={backGround}
          borderBottomWidth="1px"
          borderBottomColor={backGround}
          justifyContent={{ base: "space-between", md: "flex-end" }}
          {...rest}>
          <IconButton
            display={{ base: "flex", md: "none" }}
            onClick={onOpen}
            variant="outline"
            aria-label="open menu"
            icon={<FiMenu />}
          />

          <Image
            display={{ base: "flex", md: "none" }}
            src="./Kiefcie.png"
            alt="Kiefcie Logo"
            boxSize="125px"></Image>

          <HStack spacing={{ base: "0", md: "6" }}>
            <IconButton
              size="lg"
              variant="ghost"
              aria-label="open menu"
              icon={<FiBell />}
            />
            <Flex alignItems={"center"}>
              <Menu>
                <MenuButton
                  py={2}
                  transition="all 0.3s"
                  _focus={{ boxShadow: "none" }}>
                  <HStack>
                    <Avatar
                      size={"sm"}
                      src={user ? `http://${baseURL}/static/${user.photoProfile}` : "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"}
                    />
                    <VStack
                      display={{ base: "none", md: "flex" }}
                      alignItems="flex-start"
                      spacing="1px"
                      ml="2">
                      <Text fontSize="sm">
                        {user
                          ? user.firstName + " " + user.lastName
                          : "Loading..."}
                      </Text>
                      <Text
                        fontSize="xs"
                        color="gray.600">
                        {user ? user.userRole : "Loading..."}
                      </Text>
                    </VStack>
                    <Box display={{ base: "none", md: "flex" }}>
                      <FiChevronDown />
                    </Box>
                  </HStack>
                </MenuButton>
                <MenuList
                  bg={backGround}
                  borderColor={backGround}>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuDivider />
                  <MenuItem
                    onClick={() => {
                      dispatch(logout());
                    }}>
                    Sign out
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </HStack>
        </Flex>
      ) : (
        <Navigate
          to="/Login"
          replace
        />
      )}
    </>
  );
};

const SidebarWithHeader = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      minH="100vh"
      bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box
        ml={{ base: 0, md: 60 }}
        p="4">
        {/* Content */}
        {props.children}
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;
