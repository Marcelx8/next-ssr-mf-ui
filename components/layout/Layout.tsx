import React from 'react';
import { Box, Container, Flex } from '@chakra-ui/react'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Container maxW='container.xl'>
        <Flex justify="center">
          <Box flexBasis="100%" maxWidth="80%">
            <div style={{padding: '10px', border: '1px solid black'}}>
              {children}
            </div>
          </Box>
        </Flex>
      </Container>
    </>
  );
}

export default Layout