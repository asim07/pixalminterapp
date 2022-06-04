import React from "react";
import Layout from "components/Layout";
import IndexPage from "components/IndexPage";

type Props = {};

const Index: React.FC<Props> = () => {
  return (
    <Layout headerIsTransparent>
      <IndexPage />
    </Layout>
  );
};

export default Index;
