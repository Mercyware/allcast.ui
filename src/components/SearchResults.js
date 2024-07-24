// components/SearchResults.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { BookDomain, CheckOut } from '../services/APIService';

function SearchResults({
  results }) {

  const name = results.domain;
  const price = results.price;
  const isAvailable = results.available;
  const status = isAvailable ? 'Available' : 'Not Available';
  const email = results.email;

  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [paymentFailed, setPaymentFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleBuyDomain = async () => {
    setIsLoading(true);
    try {
      const response = await BookDomain(name, email);
      if (response) {
        const booking = response.booking;
        const body = {
          transaction_id: booking.id,
          amount: price,
          email: booking.email
        }

        const checkout_response = await CheckOut(body);
        console.log(checkout_response);
        if (checkout_response && checkout_response.booking && checkout_response.booking.status === 'paid') {
          console.log('Payment successful');
          setPaymentSuccessful(true);
        }
      } else {
        setPaymentFailed(true);
        throw new Error('Domain booking failed');
      }
    }
    catch (error) {
      setPaymentFailed(true);
      console.log(error);

    } finally {
      setIsLoading(false);
    }
    // Add logic to buy the domain
  }

  return (

    <>
      {
        (results && results.domain) && (
          <ResultsContainer>
            <ResultHeader>
              {
                isAvailable
                  ? <ResultInfo>Your Domain "{name}" is {status}</ResultInfo>
                  : <ResultInfoBad>Your Domain "{name}" is {status}</ResultInfoBad>
              }
            </ResultHeader>
            <Table>
              <thead>
                <tr>
                  <Th>Domain</Th>
                  <Th>Status</Th>
                  <Th>Price</Th>
                  <Th>Buy</Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td>{name}</Td>
                  <Td>{status}</Td>
                  <Td>NGN {price}</Td>
                  <Td>
                    <div>
                      {isAvailable && !paymentSuccessful ? (
                        <PlaceBidButton onClick={handleBuyDomain} disabled={isLoading}>
                          {isLoading ? 'Loading...' : 'Buy Domain'}
                        </PlaceBidButton>
                      ) : (
                        'Not Available'
                      )}
                    </div>
                  </Td>
                </tr>
              </tbody>
            </Table>
          </ResultsContainer>



        )
      }
      {
        paymentSuccessful && (
          <ResultsContainer>
            <SuccessContainer>
              <MessageText>
                <MessageIcon>✔️</MessageIcon>
                {"Domain Purchased Successfully. Thanks for using AllCast!"}
              </MessageText>

            </SuccessContainer>

          </ResultsContainer>

        )

      }
      {
        paymentFailed && (
          <ResultsContainer>
            <ErrorContainer>
              <MessageText>
                <MessageIcon>⚠️</MessageIcon>
                {"Domain Purchased Failed. Please try again"}
              </MessageText>

            </ErrorContainer>

          </ResultsContainer>

        )

      }
    </>
  );
}

const ResultsContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const ResultHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ResultInfo = styled.span`
  color: green;
`;

const ResultInfoBad = styled.span`
  color: red;
`;

const SortSelect = styled.select`
  padding: 5px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 10px;
  background-color: #f0f0f0;
`;

const Td = styled.td`
  padding: 10px;
  border-top: 1px solid #ddd;
`;

const PlaceBidButton = styled.button`
  background-color: #9b5de5;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const ErrorContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #f5c6cb;
  background-color: #f8d7da;
  color: #721c24;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const MessageText = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const MessageIcon = styled.span`
  margin-right: 8px;
`;

const SuccessContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #c3e6cb;
  background-color: #d4edda; 
  color: #155724; 
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;



export default SearchResults;