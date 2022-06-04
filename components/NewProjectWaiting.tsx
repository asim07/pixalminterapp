import React from "react";
import uniqId from "uniqid";
import styled from "styled-components";
import { ContainerSM } from "components/elements";

type Props = {};

const NewProject: React.FC<Props> = () => {
  return (
    <ContainerSM>
      <Root>
        <Title>Generating Artwork</Title>
        For large collections (1000+) this may take some time.
        <br />
        You can always back later
        <Image src="/images/waiting.png" />
      </Root>
    </ContainerSM>
  );
};

export default NewProject;

const Root = styled.div`
  width: 600px;
  padding: 38px 34px;
  border-radius: 10px;
  background: #ecf2fd;
  border: 1px solid #eaecee;
  text-align: center;
  font-size: 13px;
  font-weight: 800;
  line-height: 1.7;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 33px;
  padding-bottom: 16px;
`;

const Image = styled.img`
  display: block;
  width: 200px;
  margin: 0 auto;
`;
