import React, { useState, useEffect } from "react";
import styled from "styled-components";

const SponsorDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width:600px;
`;

const SponsorTagline = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const SponsorImage = styled.img`
    width: 100%;
`;

function getSponsor() {
  const [currentSponsor, setCurrentSponsor] = useState({
    name: "",
    image: "",
    url: "",
  });

  const sponsors: { name: string; image: string; url: string }[] = [
    {
      name: "cryptoflows",
      image: "https://i.postimg.cc/9FZpz6Wf/cryptoflows.png",
      url: "https://cryptoflows.info",
    },
    {
      name: "defi-savor",
      image: "https://i.postimg.cc/q7kCJY7W/defi-savor.png",
      url: "https://defisaver.com/?mtm_campaign=cryptostats-dec2022&mtm_source=cryptostats&mtm_medium=banner",
    },
  ];

  useEffect(() => {
    let x = Math.random();
  
    if (x > 0.33) {
      setCurrentSponsor(sponsors[0]);
    }
  
    if (x <= 0.33) {
      setCurrentSponsor(sponsors[1]);
    }
  }, []);

  return currentSponsor;
}

export function Sponsor() {
  const sponsor = getSponsor();
  return (
    <SponsorDiv>
      <SponsorTagline>
        <p>Supported by</p>
        <a href="www.cryptofees.info">Learn about our sponsorships</a>
      </SponsorTagline>
      <a href={sponsor.url}>
        <SponsorImage src={sponsor.image} />
      </a>
    </SponsorDiv>
  );
}
