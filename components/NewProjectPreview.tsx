import React from "react";
import styled from "styled-components";
import { Container, Button } from "components/elements";

type Props = {
  items: string[];
};

const NewProjectPreview: React.FC<Props> = ({ items }) => {
  return (
    <Root>
      <Container>
        <Header>
          <Button size="small">Add Collection to Blockchain</Button>
        </Header>
        <List>
          {items.map((item, index) => (
            <Card key={index}>
              <CardImage src={item} />
              <CardText>
                <CardTitle>Image {index + 1}</CardTitle>
              </CardText>
            </Card>
          ))}
        </List>
      </Container>
    </Root>
  );
};

export default NewProjectPreview;

const Root = styled.div``;

const Header = styled.div`
  text-align: right;
  margin-bottom: 20px;
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Card = styled.div`
  width: calc(20% - 10px);
  margin-right: 12px;
  margin-bottom: 12px;

  &:nth-child(5n),
  &:last-child {
    margin-right: 0;
  }
`;

const CardImage = styled.div<{ src: string }>`
  width: 100%;
  padding-bottom: 100%;
  padding-bottom: 92%;
  height: 0;
  position: relative;
  overflow: hidden;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: url(${({ src }) => src}) no-repeat 50%;
  background-size: cover;
`;

const CardText = styled.div`
  background: #f2f4f4;
  text-align: center;
  padding: 4px 10px 8px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const CardTitle = styled.span`
  font-size: 9px;
  font-weight: 700;
`;
