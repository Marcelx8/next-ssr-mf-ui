import React from 'react';
import { Heading } from '@chakra-ui/layout';

type TitleProps = {
  text: string
}

const Title = ({ text }: TitleProps) => {
  return (
    <Heading as="h1" marginTop="5" marginLeft="5" fontSize="5xl" color="#023e8a">
      FROM UI - {text}
    </Heading>
  )
}

export default Title
