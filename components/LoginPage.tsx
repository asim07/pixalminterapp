import React from "react";
import styled from "styled-components";
import metamaskIcon from "assets/svg/icons/metamask.svg";
import trustIcon from "assets/svg/icons/trust.svg";
import coinbaseIcon from "assets/svg/icons/coinbase.svg";
import mobileIcon from "assets/svg/icons/mobile.svg";
import { useWeb3 } from "@3rdweb/hooks";

type ConnectorOptions = "magic" | "walletconnect" | "walletlink" | "injected";

const providers = [
  {
    title: "Connect Metamask Wallet",
    icon: metamaskIcon,
    method: "injected" as ConnectorOptions,
  },
  {
    title: "Connect Trust Wallet",
    icon: trustIcon as ConnectorOptions,
  },
  {
    title: "Connect Coinbase Wallet",
    icon: coinbaseIcon,
    method: "walletlink" as ConnectorOptions,
  },
  {
    title: "WalletConnect",
    icon: mobileIcon,
    method: "walletconnect" as ConnectorOptions,
  },
];

type Props = {};

const LoginPage: React.FC<Props> = () => {
  const { address, connectWallet } = useWeb3();

  const handleConnect = (provider) => {
    connectWallet(provider);
  };

  // If a wallet is connected, show disconnect and switch network options
  if (address) {
    return (
      <Root>
        <Paper>
          <Content>
            <Title>Loading</Title>
          </Content>
        </Paper>
      </Root>
    );
  }

  return (
    <Root>
      <Paper>
        <Content>
          <Title>Login</Title>
          <Buttons>
            {providers.map(
              (provider) =>
                provider.method && (
                  <Button
                    key={provider.title}
                    onClick={() => handleConnect(provider.method)}
                  >
                    <ButtonStartIcon src={provider.icon} />
                    {provider.title}
                    <ButtonEndIcon>
                      <i className="fa fa-angle-right" />
                    </ButtonEndIcon>
                  </Button>
                )
            )}
          </Buttons>
        </Content>
        <Footer>
          Don't have a wallet?
          <a href="https://metamask.io/download" target="_blank">
            Download here
          </a>
        </Footer>
      </Paper>
    </Root>
  );
};

export default LoginPage;

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  min-height: 500px;
  padding-top: 80px;
  padding-bottom: 80px;
  margin-top: -80px;
  background-image: linear-gradient(
    180deg,
    #974e82 0%,
    #2c2b6a 50%,
    #1e2251 100%
  );
`;

const Paper = styled.div`
  width: 450px;
  height: 380px;
  margin-top: 50px;
  background: #ffffff;
  border: 1px solid #eaecee;
  border-radius: 10px;
  text-align: center;
`;

const Content = styled.div`
  padding: 36px 78px 0;
`;

const Footer = styled.div`
  padding: 20px 78px 0;
  border-top: 1px solid #eaecee;
  font-size: 12px;
  color: #7377a9;

  a {
    display: inline-block;
    margin-left: 4px;
    color: #fd576c;
    font-weight: 700;
  }
`;

const Title = styled.h1`
  margin-bottom: 30px;
  font-size: 34px;
  font-weight: 700;
  line-height: 1;
`;

const Buttons = styled.div`
  margin-bottom: 34px;
`;

const Button = styled.button`
  position: relative;
  display: block;
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
  padding: 0 50px;
  background: #ffffff;
  border: 1px solid #eaecee;
  border-radius: 4px;
  color: #0f123d;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  box-shadow: none;
  outline: none;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ButtonEndIcon = styled.div`
  position: absolute;
  display: block;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  width: 7px;
`;

const ButtonStartIcon = styled.img`
  position: absolute;
  display: block;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  width: 26px;
`;
