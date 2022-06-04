import React from "react";
import router from "next/router";
import Layout from "components/Layout";
import LoginPage from "components/LoginPage";
import { useWeb3 } from "@3rdweb/hooks";

type Props = {};

const Login: React.FC<Props> = () => {
  const { address } = useWeb3();

  if (address) router.push(`/profile/${address}`);

  return (
    <Layout headerIsTransparent>
      <LoginPage />
    </Layout>
  );
};

export default Login;
