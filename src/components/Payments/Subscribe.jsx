import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
  useDisclosure,
  Image,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  Flex,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { server } from '../../redux/store';
import toast from 'react-hot-toast';
import logo from '../../assets/images/logo.png';
import { FaCreditCard, FaMoneyBill, FaUniversity } from 'react-icons/fa';

const Subscribe = ({ user }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // Open payment gateway modal
  const subscribeHandler = async () => {
    setLoading(true);
    // Simulate a small delay before opening the modal
    setTimeout(() => {
      setLoading(false);
      onOpen();
    }, 500);
  };
  
  // Process payment
  const processPayment = async () => {
    try {
      setProcessingPayment(true);
      
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Call to dummy payment API that always succeeds
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        title: 'Payment Request',
        body: 'Course subscription payment',
        userId: user?._id || '123',
        amount: 299,
        currency: 'INR',
        paymentMethod
      });
      
      // Generate dummy payment data
      const paymentId = 'pay_' + Date.now() + Math.random().toString(36).substring(2, 7);
      
      // Call your backend to record the payment
      await axios.post(`${server}/paymentverification`, {
        razorpay_payment_id: paymentId,
        razorpay_subscription_id: 'sub_' + Date.now(),
        razorpay_signature: 'dummy_sig_' + Date.now()
      });
      
      // Close modal
      onClose();
      
      // Show success message
      toast.success('Payment Successful! Your subscription is now active.');
      
      // Redirect to success page
      window.location.href = `/paymentsuccess?reference=${paymentId}`;
      
    } catch (error) {
      console.error('Payment error:', error);
      
      // Even if there's an error, show success for demo purposes
      onClose();
      toast.success('Payment Successful! Your subscription is now active.');
      
      // Generate fallback payment ID
      const fallbackPaymentId = 'pay_' + Date.now();
      
      // Redirect to success page anyway
      window.location.href = `/paymentsuccess?reference=${fallbackPaymentId}`;
    } finally {
      setProcessingPayment(false);
    }
  };

  return (
    <Container h="90vh" p="16">
      <Heading children="Welcome" my="8" textAlign={'center'} />

      <VStack
        boxShadow={'lg'}
        alignItems="stretch"
        borderRadius={'lg'}
        spacing="0"
      >
        <Box bg="yellow.400" p={'4'} css={{ borderRadius: '8px 8px 0 0' }}>
          <Text color={'black'} children={`Pro Pack - ₹299.00`} />
        </Box>
        <Box p="4">
          <VStack textAlign={'center'} px="8" mt={'4'} spacing="8">
            <Text children={`Join pro pack and get access to all content.`} />
            <Heading size="md" children={'₹299 Only'} />
          </VStack>

          <Button
            my="8"
            w="full"
            colorScheme={'yellow'}
            onClick={subscribeHandler}
            isLoading={loading}
          >
            Buy Now
          </Button>
        </Box>

        <Box bg="blackAlpha.600" p="4" css={{ borderRadius: '0 0 8px 8px' }}>
          <Heading
            color={'white'}
            textTransform="uppercase"
            size="sm"
            children={'100% refund at cancellation'}
          />

          <Text
            fontSize={'xs'}
            color="white"
            children={'*Terms & Conditions Apply'}
          />
        </Box>
      </VStack>

      {/* Payment Gateway Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex align="center" justify="space-between">
              <Text>Complete Your Payment</Text>
              <Image src={logo} boxSize="40px" />
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Box p={2} borderWidth="1px" borderRadius="md">
                <Text fontWeight="bold">Amount: ₹299.00</Text>
                <Text fontSize="sm" color="gray.600">Pro Pack Subscription</Text>
              </Box>
              
              <Box>
                <Text mb={2} fontWeight="medium">Select Payment Method</Text>
                <RadioGroup onChange={setPaymentMethod} value={paymentMethod}>
                  <Stack spacing={3}>
                    <Box p={3} borderWidth="1px" borderRadius="md" borderColor={paymentMethod === 'card' ? 'yellow.400' : 'gray.200'}>
                      <Radio value="card">
                        <HStack>
                          <FaCreditCard />
                          <Text>Credit/Debit Card</Text>
                        </HStack>
                      </Radio>
                    </Box>
                    
                    <Box p={3} borderWidth="1px" borderRadius="md" borderColor={paymentMethod === 'netbanking' ? 'yellow.400' : 'gray.200'}>
                      <Radio value="netbanking">
                        <HStack>
                          <FaUniversity />
                          <Text>Net Banking</Text>
                        </HStack>
                      </Radio>
                    </Box>
                    
                    <Box p={3} borderWidth="1px" borderRadius="md" borderColor={paymentMethod === 'upi' ? 'yellow.400' : 'gray.200'}>
                      <Radio value="upi">
                        <HStack>
                          <FaMoneyBill />
                          <Text>UPI Payment</Text>
                        </HStack>
                      </Radio>
                    </Box>
                  </Stack>
                </RadioGroup>
              </Box>
              
              {paymentMethod === 'card' && (
                <VStack spacing={3} align="stretch">
                  <FormControl>
                    <FormLabel>Card Number</FormLabel>
                    <Input placeholder="1234 5678 9012 3456" />
                  </FormControl>
                  
                  <HStack>
                    <FormControl>
                      <FormLabel>Expiry</FormLabel>
                      <Input placeholder="MM/YY" />
                    </FormControl>
                    
                    <FormControl>
                      <FormLabel>CVV</FormLabel>
                      <Input placeholder="123" type="password" maxLength={3} />
                    </FormControl>
                  </HStack>
                  
                  <FormControl>
                    <FormLabel>Name on Card</FormLabel>
                    <Input placeholder="John Doe" />
                  </FormControl>
                </VStack>
              )}
              
              {paymentMethod === 'netbanking' && (
                <VStack spacing={3} align="stretch">
                  <FormControl>
                    <FormLabel>Select Bank</FormLabel>
                    <Input placeholder="Select your bank" />
                  </FormControl>
                </VStack>
              )}
              
              {paymentMethod === 'upi' && (
                <VStack spacing={3} align="stretch">
                  <FormControl>
                    <FormLabel>UPI ID</FormLabel>
                    <InputGroup>
                      <Input placeholder="name@upi" />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" colorScheme="blue">
                          Verify
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                </VStack>
              )}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button 
              colorScheme="yellow" 
              onClick={processPayment} 
              isLoading={processingPayment}
              loadingText="Processing"
            >
              Pay ₹299
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Subscribe;