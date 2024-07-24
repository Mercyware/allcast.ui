// App.js
import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import DomainSearch from './components/DomainSearch';
import SearchResults from './components/SearchResults';

const AppContainer = styled.div`
  font-family: Arial, sans-serif;
`;

const MainContent = styled.main`
  background: linear-gradient(135deg, #9b5de5, #f15bb5);
  min-height: 100vh;
  padding: 50px 20px;
`;

const Title = styled.h1`
  color: white;
  text-align: center;
  font-size: 48px;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  color: white;
  text-align: center;
  font-size: 24px;
  margin-bottom: 40px;
`;

function App() {

  const [searchResults, setSearchResults] = useState([]);

  // Function to handle new search data
  const handleSearch = (results) => {
    console.log('Search results:', results);
    setSearchResults(results);
  };


  return (
    <AppContainer>
      <Header />
      <MainContent>
        <Subtitle>I would like to</Subtitle>
        <Title>Buy Domains</Title>
        <DomainSearch onSearch={handleSearch} />
        <SearchResults results={searchResults} />
      </MainContent>
    </AppContainer>
  );
}

export default App;