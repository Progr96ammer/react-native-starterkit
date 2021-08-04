import * as React from 'react';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import {
    NativeBaseProvider,
    Box,
    Text,
    Heading,
    VStack,
    FormControl,
    Input,
    Link,
    Button,
    Icon,
    IconButton,
    HStack,
    Divider
} from 'native-base';

export default function App({ navigation }) {
    return (
        <NativeBaseProvider>
            <Box
                style={{paddingTop:40}}
                flex={1}
                p={2}
                w="90%"
                mx='auto'
            >
                <Heading size="lg" color='primary.500'>
                    Welcome
                </Heading>
                <Heading color="muted.400" size="xs">
                    Sign up to continue!
                </Heading>

                <VStack space={2} mt={5}>
                    <FormControl>
                        <FormControl.Label _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
                            Name
                        </FormControl.Label>
                        <Input />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
                            Username
                        </FormControl.Label>
                        <Input />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
                            Email
                        </FormControl.Label>
                        <Input />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label  _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
                            Password
                        </FormControl.Label>
                        <Input type="password" />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label  _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
                            Confirm Password
                        </FormControl.Label>
                        <Input type="password" />
                    </FormControl>
                    <VStack  space={2}  mt={5}>
                        <Button colorScheme="cyan" _text={{color: 'white' }}>
                            SignUp
                        </Button>
                    </VStack>
                    <HStack justifyContent="center">
                        <Text fontSize='sm' color='muted.700' fontWeight={400}>I have an account. </Text>
                        <Link onPress={() => navigation.navigate('login')} _text={{ color: 'cyan.500', bold: true, fontSize: 'sm' }} >
                            Login
                        </Link>
                    </HStack>
                </VStack>
            </Box>
        </NativeBaseProvider>
    );
}
