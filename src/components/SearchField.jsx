import React from 'react';
import { FaSearch } from 'react-icons/fa';
import {InputGroup,InputLeftElement,Input} from '@chakra-ui/react';

const SearchField = ({setSearchText,placeholder}) => {
  return (
    <InputGroup mt="2" mb="2">
                <InputLeftElement pointerEvents='none'>
                <FaSearch color='gray.300' />
                </InputLeftElement>
                <Input placeholder={placeholder} onChange={e => setSearchText(e.target.value)}/>
    </InputGroup>
  )
}

export default SearchField