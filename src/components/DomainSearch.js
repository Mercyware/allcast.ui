// components/DomainSearch.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { isValidDomain, isValidEmail } from '../utils/Validators';
import { CheckDomainAvailability } from '../services/APIService'



function DomainSearch({ onSearch }) {
  // Define state for the search input and selected domain
  const [domainText, setDomainText] = useState('');
  const [emailText, setEmailText] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('.com');
  const [errors, setErrors] = useState({});

  // Handle changes in the search input
  const handleDomainTextChange = (event) => {
    setDomainText(event.target.value);
  };

  const handleEmailTextChange = (event) => {
    setErrors({});
    setEmailText(event.target.value);
  };

  // Handle changes in the domain select
  const handleDomainChange = (event) => {
    setErrors({});
    setSelectedDomain(event.target.value);
  };

  // Handle button click
  const handleButtonClick = async () => {
    setErrors({});
    let formErrors = {};

    const domain = `${domainText}${selectedDomain}`;
    const email = emailText;
    console.log(domain, email);

    if (!isValidEmail(email)) {
      formErrors.email = 'Email is required and must be a valid email address';
    }

    if (!isValidDomain(domain)) {
      formErrors.domain = 'Domain is required and must be a valid domain name';
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      console.log(`Searching for: ${domain}`);

      // Add further logic here, such as making an API call

      try {
        const response = await CheckDomainAvailability(domain);
        if (response) {
          const result = response.result;
          result.email = email;
          onSearch(result);
        } else {
          throw new Error('Domain is not available');
        }

      } catch (error) {
        console.error('Error checking domain availability:', error);
        formErrors.domain = 'Domain is not available';
        setErrors(formErrors);
      }
    }
  };


  return (
    <>
      <SearchContainer>
        <EmailInput
          type="text"
          placeholder="Enter email address"
          value={emailText}
          onChange={handleEmailTextChange}
        />
      </SearchContainer>


      <SearchContainer>

        <SearchInput
          type="text"
          placeholder="Enter domain name"
          value={domainText}
          onChange={handleDomainTextChange}
        />
        <DomainSelect value={selectedDomain} onChange={handleDomainChange}>
          <option value=".com">.com</option>
          <option value=".net">.net</option>
          <option value=".org">.org</option>
        </DomainSelect>

      </SearchContainer>

      <SearchContainer>
        <CheckButton onClick={handleButtonClick}>Check</CheckButton>
      </SearchContainer>

      <SearchContainer>
        {Object.keys(errors).length > 0 && (
          <ErrorContainer>
            {Object.entries(errors).map(([field, error], index) => (
              <ErrorText key={index}>
                <ErrorIcon>⚠️</ErrorIcon>
                {error}
              </ErrorText>
            ))}
          </ErrorContainer>
        )}
      </SearchContainer>
    </>

  );
}

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const SearchInput = styled.input`
  padding: 15px;
  width: 350px;
  border: none;
 
`;

const EmailInput = styled.input`
  padding: 15px;
  width: 420px;
  border: none;
`;

const DomainSelect = styled.select`
  padding: 15px;
  border: none;
  background-color: white;
`;

const CheckButton = styled.button`
  padding: 15px 30px;
  background-color: #f15bb5;
  color: white;
  border: none;
 
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

const ErrorText = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ErrorIcon = styled.span`
  margin-right: 8px;
`;

export default DomainSearch;