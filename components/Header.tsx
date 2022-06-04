import React from "react";
import Link from "next/link";
import { useWeb3 } from "@3rdweb/hooks";
import styled from "styled-components";
import { Button } from "components/elements";
import logo from "assets/svg/logo.svg";

type Props = {
  transparent?: boolean;
};

const Header: React.FC<Props> = ({ transparent }) => {
  const { address, chainId, connectWallet, disconnectWallet } = useWeb3();

  return (
    <Root transparent={transparent}>
      <Inner>
        <Link href="/" passHref>
          <a>
            <LogoImage src={logo} />
          </a>
        </Link>
        <Nav>
          <NavItem>
            <Link href="/guide" passHref>
              <a>
                <NavLink>Guide</NavLink>
              </a>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/contact" passHref>
              <a>
                <NavLink>Contact Us</NavLink>
              </a>
            </Link>
          </NavItem>
          {!address && (
            <NavItem>
              <Link href="/login" passHref>
                <a>
                  <Button>Connect Wallet</Button>
                </a>
              </Link>
            </NavItem>
          )}
          {address && (
            <NavItem>
              <Link href={`/profile/${address}`} passHref>
                <a>
                  <Address>{address}</Address>
                </a>
              </Link>
            </NavItem>
          )}
        </Nav>
      </Inner>
    </Root>
  );
};

export default Header;

const Root = styled.header<{ transparent?: boolean }>`
  position: relative;
  z-index: 10;
  display: flex;
  padding: 15px 0;
  background: ${({ transparent }) => (transparent ? "transparent" : "#121252")};
  font-size: 14px;
  height: 80px;
`;

const LogoImage = styled.img`
  display: block;
  width: 150px;
`;

const Nav = styled.div`
  display: flex;
  align-items: center;
`;

const NavItem = styled.div``;

const NavLink = styled.div`
  margin-right: 20px;
  font-size: 14px;
  color: #dcdbdb;
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 910px;
  margin: 0 auto;
  flex: 1 0 auto;
`;

const Address = styled.div`
  width: 120px;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border: 1px solid currentColor;
  padding: 5px;
  border-radius: 10px;
`;
