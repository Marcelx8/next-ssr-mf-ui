import React from 'react';
import { Heading } from '@chakra-ui/react';
React.useLayoutEffect = React.useEffect;

type TitleProps = {
  text: string;
};

const Title = ({ text }: TitleProps) => {
  return (
    <>
      <Heading as="h1" marginTop="5" marginLeft="5" fontSize="5xl" color="#023e8a">
        {text} +z
      </Heading>
    </>
  );
};

export default Title;
