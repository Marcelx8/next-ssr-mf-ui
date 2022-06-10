import React from "react";
import {
  Heading,
  Box,
  Center,
  Stack,
  Button,
} from '@chakra-ui/react';
React.useLayoutEffect = React.useEffect

const Counter = ({ count, onIncrement, onDecrement }: { count: number, onIncrement: () => void, onDecrement: () => void }) => {
  return (
    <Center py={2}>
      <Box
        maxW={'400px'}
        w={'full'}
        bg={'green'}
        rounded={'lg'}
        p={10}
        textAlign={'center'}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div>Counter Component from UI remote</div>
          <div>using Zustand state manager</div>
        </div>
        <Heading as="h2" color={'#ffffff'} mb={5} fontSize="2xl" className="heading">
          Count: {count}
        </Heading>
        <Stack spacing={4} direction='row' justify="center" align='center'>
          <Button
            p={5} size='s' onClick={onIncrement}>
            Increment
          </Button>
          <Button
            p={5} size='s' onClick={onDecrement}>
            Decrement
          </Button>
        </Stack>
      </Box>
    </Center>
  )
}

export default Counter;
