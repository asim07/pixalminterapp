import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { Container, Button } from "components/elements";

import logo from "assets/svg/logo.svg";
import pricing1image from "assets/svg/pricing-1.svg";
import pricing2image from "assets/svg/pricing-2.svg";
import pricing3image from "assets/svg/pricing-3.svg";
import features1image from "assets/svg/features-1.svg";
import features2image from "assets/svg/features-2.svg";
import features3image from "assets/svg/features-3.svg";
import features4image from "assets/svg/features-4.svg";
import features5image from "assets/svg/features-5.svg";

const plans = [
  {
    title: "Free",
    image: pricing1image,
    text: `Create collections up to 100 unique NFT's completely for free and download the collection so you can mint them on any marketplace you like`,
  },
  {
    title: "Pay Up-Front",
    image: pricing2image,
    text: `When you know your collection is going to be a hit, pay for the creation up front at $0.10 per illustration`,
    featured: true,
  },
  {
    title: "Minting fee",
    image: pricing3image,
    text: `No upfront cost. 7.5% commission on minting of the original NFT`,
  },
];

const features = [
  {
    title: "Easy to use",
    image: features1image,
    text: `User Interface designed for creators not coders`,
  },
  {
    title: "Compatible",
    image: features2image,
    text: `Sell your NFT's on marketplaces like OpenSea - Trade your NFT's on whichever marketplace works for you since you own the contract`,
  },
  {
    title: "Flexible Payment Structure",
    image: features3image,
    text: `Decide how you want to pay to work with your project`,
  },
  {
    title: "Quick",
    image: features4image,
    text: `Have your NFT's ready to go in record time and get to marketing them with your fans!`,
  },
  {
    title: "Customizable ",
    image: features5image,
    text: `Set feature rarity, unlimited layers and features, add metadata and use our airdropping feature`,
  },
];

const HeroCardComponent = () => {
  const [hover, setHover] = React.useState(false);

  React.useEffect(() => {}, [hover]);

  return (
    <HeroCard>
      <HeroCardInner>
        <HeroCardImage
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          src="/images/hero-card-1.jpg"
        />
        <HeroCardTitle>Corporate Escapee</HeroCardTitle>
        <Link href="/new" passHref>
          <a>
            <Button>Create Now</Button>
          </a>
        </Link>
      </HeroCardInner>
    </HeroCard>
  );
};

type Props = {};

const IndexPage: React.FC<Props> = ({}) => {
  return (
    <>
      <Hero>
        <Container>
          <HeroInner>
            <HeroText>
              <HeroTitle>Generate Bulk NFT's Without Any Code!</HeroTitle>
              <HeroDesc>
                Create your NFT collection at the click of a button.
              </HeroDesc>
            </HeroText>
            <HeroCardComponent />
          </HeroInner>
        </Container>
      </Hero>
      <Section>
        <Container>
          <Title>Our Pricing</Title>
          <Plans>
            {plans.map((plan) => (
              <Plan featured={plan.featured} key={plan.title}>
                <PlanImageWrapper>
                  <PlanImage src={plan.image} />
                </PlanImageWrapper>
                <PlanTitle light={plan.featured}>{plan.title}</PlanTitle>
                <PlanText light={plan.featured}>{plan.text}</PlanText>
                {plan.featured && (
                  <PlanRecommendedBadge>Recommended</PlanRecommendedBadge>
                )}
              </Plan>
            ))}
          </Plans>
        </Container>
      </Section>
      <Section bg="#ECF2FD" style={{ paddingBottom: "75px" }}>
        <Container>
          <PreTitle>Our Features</PreTitle>
          <Title>Why Choose Us</Title>
          <Plans>
            {features.map((feature) => (
              <Plan key={feature.title}>
                <PlanImageWrapper>
                  <PlanImage src={feature.image} />
                </PlanImageWrapper>
                <PlanTitle>{feature.title}</PlanTitle>
                <PlanText>{feature.text}</PlanText>
              </Plan>
            ))}
          </Plans>
        </Container>
      </Section>
      <Footer>
        <Container>
          <FooterBanner>
            <FooterTitle>Create The Next Character NFT</FooterTitle>
            <Button>Join Us Now</Button>
          </FooterBanner>
        </Container>
        <FooterBottom>
          <Container>
            <FooterBottomInner>
              <FooterLogo src={logo} />
              <FooterCopyright>
                © 2022 <b>Pixel True NFT</b>. All Rights Reserved
              </FooterCopyright>
            </FooterBottomInner>
          </Container>
        </FooterBottom>
      </Footer>
    </>
  );
};

export default IndexPage;

const Plans = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Plan = styled.div<{ featured?: boolean }>`
  position: relative;
  width: calc(33.33% - 16px);
  height: 320px;
  margin-bottom: 24px;
  margin-right: 24px;
  border: 1px solid #eaecee;
  border-radius: 12px;
  text-align: center;
  padding: 30px 20px;
  background: ${({ featured }) => (featured ? "#0F123D" : "#ffffff")};
  overflow: hidden;

  &:last-child,
  &:nth-child(3n) {
    margin-right: 0;
  }
`;

const PlanImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 155px;
  height: 140px;
  margin: 0 auto 20px;
`;

const PlanImage = styled.img`
  display: block;
  width: 100%;
`;

const PlanTitle = styled.div<{ light?: boolean }>`
  color: ${({ light }) => (light ? "#ffffff" : "#0e234b")};
  font-size: 16px;
  font-weight: 700;
  padding-bottom: 6px;
`;

const PlanText = styled.div<{ light?: boolean }>`
  color: ${({ light }) => (light ? "#DCDBDB" : "#7377a9")};
  font-size: 13px;
  line-height: 1.4;
`;

const PlanRecommendedBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  width: 290px;
  height: 30px;
  transform: rotate(29deg) translateY(-92px) translateX(75px);
  transform-origin: 0 0;
  color: #ffdbdf;
  background: #fd576c;
  text-transform: uppercase;
  font-size: 10px;
  letter-spacing: 2px;
`;

const Hero = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 80px 0 80px;
  margin-top: -80px;
  background-image: linear-gradient(
    180deg,
    #974e82 0%,
    #2c2b6a 50%,
    #1e2251 100%
  );
  color: #fff;
`;

const HeroInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
`;

const HeroText = styled.div`
  max-width: 460px;
`;

const HeroTitle = styled.h1`
  font-size: 46px;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 20px;
`;

const HeroDesc = styled.p`
  color: #dcdbdb;
`;

const HeroCard = styled.div`
  width: 290px;
  height: 410px;
  background: #ffffff;
  border-radius: 12px;
`;

const Section = styled.div<{ bg?: string }>`
  padding: 100px 0;
  background: ${({ bg }) => (bg ? bg : "#ffffff")};
`;

const Title = styled.h2`
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  padding-bottom: 42px;
  color: #0f123d;
`;

const PreTitle = styled.div`
  color: #fd576c;
  text-transform: uppercase;
  text-align: center;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 4px;
  padding-bottom: 4px;
`;

const Footer = styled.div`
  background-image: linear-gradient(
    180deg,
    #974e82 0%,
    #2c2b6a 40%,
    #1e2251 81%
  );
  color: #ffffff;
`;

const FooterTitle = styled.div`
  font-size: 40px;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 34px;
`;

const FooterBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding-top: 75px;
  padding-bottom: 80px;
`;

const FooterBottom = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  color: #ffffff;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`;

const FooterBottomInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FooterLogo = styled.img`
  display: block;
  width: 150px;
`;

const FooterCopyright = styled.div`
  color: #dcdbdb;

  b {
    color: #ffffff;
  }
`;

const HeroCardImage = styled.img`
  width: 100%;
  display: block;
  margin-bottom: 14px;
`;

const HeroCardTitle = styled.div`
  font-weight: 700;
  color: #0f123d;
  font-size: 20px;
  margin-bottom: 22px;
`;

const HeroCardInner = styled.div`
  padding: 18px;
  text-align: center;
`;
