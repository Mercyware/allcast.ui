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

  console.log(name, price, isAvailable, status, email);

  const handleBuyDomain = async () => {
    console.log('Buy domain:', name);

    try {
      const response = await BookDomain(name, email);
      console.log(response);
      if (response) {
        const booking = response.booking;
        console.log(booking);

        const body = {
          transaction_id: booking.id,
          amount: price,
          email: booking.email
        }

        const checkout_response = await CheckOut(body);
        console.log(checkout_response);
        if (checkout_response && checkout_response.booking && checkout_response.booking.status === 'paid') {
          console.log('Payment successful');
        }
      } else {
        throw new Error('Domain booking failed');
      }
    }
    catch (error) {
      console.log(error);
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
                    {
                      isAvailable
                        ? <PlaceBidButton onClick={handleBuyDomain}>Buy Domain</PlaceBidButton>
                        : 'Not Available'
                    }
                  </Td>
                </tr>
              </tbody>
            </Table>
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



export default SearchResults;