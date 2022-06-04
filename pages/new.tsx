import React from "react";
import Layout from "components/Layout";
import NewProject from "components/NewProject";
import NewProjectWaiting from "components/NewProjectWaiting";
import NewProjectPreview from "components/NewProjectPreview";
import PageHeader from "components/PageHeader";
import uniqId from "uniqid";
import { useWeb3 } from "@3rdweb/hooks";

type Props = {};

const Index: React.FC<Props> = () => {
  const [loading, setLoading] = React.useState(false);
  const { address } = useWeb3();
  const [projectId] = React.useState(uniqId());
  const [generated, setGenerated] = React.useState();
  const [step, setStep] = React.useState(1);

  const handleGenerate = async ({ items, layers }) => {
    if (!items || items.length === 0) return;

    setStep(2);
    setLoading(true);

    const request = {
      items,
      layers,
      projectId: projectId,
      address: address,
    };

    const response = await fetch(`/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    const data = await response.json();
    setGenerated(data.data);
    setLoading(false);
  };

  React.useEffect(() => {
    if (generated) {
      setStep(1);
    }
  }, [generated]);

  console.log("generated", generated);

  return (
    <Layout headerIsTransparent={step !== 1}>
      <>
        {step === 1 && <NewProject onGenerate={handleGenerate} />}
        {step === 2 && (
          <>
            <PageHeader title="Preview Images" />
            <NewProjectWaiting />
          </>
        )}
        {step === 3 && (
          <>
            <PageHeader title="Preview Images" />
            <NewProjectPreview items={[generated]} />
          </>
        )}
      </>
    </Layout>
  );
};

export default Index;
