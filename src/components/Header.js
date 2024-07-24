// components/Header.js
import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: white;
`;

const Logo = styled.div`
  font-weight: bold;
  font-size: 24px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavItem = styled.a`
  text-decoration: none;
  color: black;
`;

const GetStartedButton = styled.button`
  background-color: #f15bb5;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
`;

function Header() {
  return (
    <HeaderContainer>
      <Logo>ALLCAST</Logo>
      <Nav>
      </Nav>
      <GetStartedButton>GET STARTED</GetStartedButton>
    </HeaderContainer>
  );
}

export default Header;