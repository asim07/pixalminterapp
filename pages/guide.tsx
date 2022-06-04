import React from "react";
import Layout from "components/Layout";
import PageHeader from "components/PageHeader";

type Props = {};

const GuidePage: React.FC<Props> = () => {
  return (
    <Layout headerIsTransparent>
      <div>
        <PageHeader title="Guide" />
        <div>Coming soon</div>
      </div>
    </Layout>
  );
};

export default GuidePage;
