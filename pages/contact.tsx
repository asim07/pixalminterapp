import React from "react";
import Layout from "components/Layout";
import PageHeader from "components/PageHeader";

type Props = {};

const ContactPage: React.FC<Props> = () => {
  return (
    <Layout headerIsTransparent>
      <div>
        <PageHeader title="Contact Us" />
        <div>Coming soon</div>
      </div>
    </Layout>
  );
};

export default ContactPage;
