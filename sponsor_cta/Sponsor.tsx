import React, { useState, useEffect } from "react";
import styled from "styled-components";

const SponsorDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  margin: 0;
  padding: 0;
`;

const SponsorTagline = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0;
  padding-bottom: 10px;
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

  const sponsors: SponsorData[] = [
    {
      name: "cryptoflows",
      image: "https://i.postimg.cc/9FZpz6Wf/cryptoflows.png",
      url: "https://cryptoflows.info",
    },
    {
      name: "defi-saver",
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

export interface SponsorData {
  name: string;
  image: string;
  url: string;
}

export function Sponsor({
  onSponsorInfo,
  onSponsorClick,
}: {
  onSponsorInfo?: () => void;
  onSponsorClick?: (data: SponsorData) => void;
}) {
  const sponsor = getSponsor();
  return (
    <SponsorDiv>
      <SponsorTagline>
        <span>Supported by</span>
        <a
          onClick={onSponsorInfo}
          href="https://docs.google.com/document/d/14ZM4GFz8419h9C66aobTeec0VxfjEVcxQXVyIz3Lsgw/edit"
          target="_blank"
        >
          Learn about our sponsorships
        </a>
      </SponsorTagline>
      <a
        onClick={onSponsorClick && (() => onSponsorClick(sponsor))}
        href={sponsor.url}
      >
        <SponsorImage src={sponsor.image} />
      </a>
    </SponsorDiv>
  );
}
