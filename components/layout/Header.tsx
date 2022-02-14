import React from 'react';
import {
  Box,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';

const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.400', 'gray.400')}
        align={'center'}>
        {children}
      </Flex>
    </Box>
  )
}

export default Header;