import React from "react";
import Layout from "components/Layout";
import ProjectsPage from "components/ProjectsPage";

type Props = {};

const Index: React.FC<Props> = () => {
  return (
    <Layout headerIsTransparent>
      <ProjectsPage />
    </Layout>
  );
};

export default Index;
