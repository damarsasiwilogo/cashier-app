import React, { useState } from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

export const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    
    // Trigger the search function passed as a prop
    onSearch(newQuery);
  };

  return (
    <>
      <InputGroup borderRadius={5} size="sm">
        <InputLeftElement
          pointerEvents="none"
          children={<Search2Icon color="gray.600" />}
        />
        <Input 
          type="text" 
          placeholder="Search..." 
          border="1px solid #949494"
          value={query}
          onChange={handleInputChange}
        />
      </InputGroup>
    </>
  );
};
