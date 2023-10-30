import { Box, Heading, Text, Image } from "@chakra-ui/react";

const NotFoundPage = () => {
  return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        bg="#07183b"
        color="#FFFFFF"
        fontFamily="Arial, sans-serif"
        textAlign="center"
        flexDirection="column"
        bgImage="url('./homepage-bg.jpg')"
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
      >
        <Box>
          <Heading 
            as="h1" 
            size="2xl" 
            mb={4} 
            fontWeight="bold"
            textShadow="
              1px 0 black, 
              0 1px black, 
              1px 1px black, 
              -1px 0 black, 
              0 -1px black, 
              -1px -1px black
            "
          >
            Oops! Page Not Found
          </Heading>
          <Text 
            fontSize="lg" 
            fontWeight="medium" 
            mb={6}
            textShadow="
              1px 0 black, 
              0 1px black, 
              1px 1px black, 
              -1px 0 black, 
              0 -1px black, 
              -1px -1px black
            "
          >
            We're sorry, but the page you're looking for doesn't exist.
          </Text>
          <Text 
            fontSize="sm"
            textShadow="
              0.5px 0 black, 
              0 0.5px black, 
              0.5px 0.5px black, 
              -0.5px 0 black, 
              0 -0.5px black, 
              -0.5px -0.5px black
            "
          >
            Please check the URL or go back to the{" "}
            <Box as="a" href="/" color="#FFFFFF" textDecoration="underline">
              homepage
            </Box>
            .
          </Text>
        </Box>
      </Box>
  );
};

export default NotFoundPage;