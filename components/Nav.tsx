import NextLink from "next/link"
import React from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  Link as ChakraLink,
  useDisclosure,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
React.useLayoutEffect = React.useEffect

export type NavItem = {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href: string;
}

export type NavProps = {
  navItems: NavItem[] | undefined;
  count?: number
};

const WithSubnavigation = ({ navItems, count }: NavProps) => {
  const { isOpen, onToggle } = useDisclosure();

  if (!navItems) {
    return (
      <div>No Nav items</div>
    )
  }

  return (
    <>
      <Box>
        <Flex
          bg={'white'}
          color={'gray.600'}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={'gray.200'}
          align={'center'}>
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}>
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
              }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
            {(navItems) && <>
              <Text
                align={{ base: 'center', md: 'left' }}
                fontFamily={'heading'}
                fontWeight={'bold'}
                color={'gray.600'}>
                UI Nav
              </Text>
              <Text as={'span'}
              fontFamily={'heading'}
              fontWeight={'bold'}
              color={'red'}> {count} </Text>
            </>}

            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <DesktopNav navItems={navItems} />
            </Flex>
          </Flex>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <MobileNav navItems={navItems} />
        </Collapse>
      </Box>
    </>
  );
}

export const DesktopNav = ({ navItems }: NavProps) => {

  return (
    <>
      <Stack direction={'row'} spacing={4}>
        {navItems && navItems.map((item) => (
          <Box key={item.label}>
            <NextLink href={item.href} key={item.label} passHref={true}>
              <ChakraLink
                p={2}
                fontSize={'lg'}
                fontWeight={500}
                color={'blue.400'}
                _hover={{
                  textDecoration: 'none',
                  color: 'blue.600',
                }}>
                {item.label}
              </ChakraLink>
            </NextLink>
          </Box>
        ))}
      </Stack>
    </>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <>
      <NextLink href={href} passHref={true}>
        <ChakraLink
          role={'group'}
          display={'block'}
          p={2}
          rounded={'md'}
          _hover={{ bg: 'pink.50' }}>
          <Stack direction={'row'} align={'center'}>
            <Box>
              <Text
                transition={'all .3s ease'}
                _groupHover={{ color: 'pink.400' }}
                fontWeight={500}>
                {label}
              </Text>
              <Text fontSize={'sm'}>{subLabel}</Text>
            </Box>
            <Flex
              transition={'all .3s ease'}
              transform={'translateX(-10px)'}
              opacity={0}
              _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
              justify={'flex-end'}
              align={'center'}
              flex={1}>
              <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
            </Flex>
          </Stack>
        </ChakraLink>
      </NextLink>
    </>
  );
};

export const MobileNav = ({ navItems }: NavProps) => {

  return (
    <>
      <Stack
        bg={'white'}
        p={4}
        display={{ md: 'none' }}>
        {navItems && navItems.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
      </Stack>
    </>
  );
};

export const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Stack spacing={4} onClick={children && onToggle}>
        <NextLink href={href ?? '#'} passHref={true}>
          <Flex
            py={2}
            as={ChakraLink}
            justify={'space-between'}
            align={'center'}
            _hover={{
              textDecoration: 'none',
            }}>
            <Text
              fontWeight={600}
              color={'gray.600'}>
              {label}
            </Text>
            {children && (
              <Icon
                as={ChevronDownIcon}
                transition={'all .25s ease-in-out'}
                transform={isOpen ? 'rotate(180deg)' : ''}
                w={6}
                h={6}
              />
            )}
          </Flex>
        </NextLink>

        <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
          <Stack
            mt={2}
            pl={4}
            borderLeft={1}
            borderStyle={'solid'}
            borderColor={'gray.200'}
            align={'start'}>
            {children &&
              children.map((child) => (
                <NextLink key={child.label} href={child.href} passHref={true}>
                  <ChakraLink py={2}>
                    {child.label}
                  </ChakraLink>
                </NextLink>
              ))}
          </Stack>
        </Collapse>
      </Stack>
    </>
  );
};

export default WithSubnavigation