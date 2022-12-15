import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface Size {
  width: number | undefined;
  height: number | undefined;
}

const HeaderMain = styled.header`
  display: flex;
  justify-content: center;
`;

const HeaderLinks = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  align-items: center;
`;

const HeaderLinkUl = styled.ul`
  text-align: right;
`;

const Dropdown = styled.ul`
  position: absolute;
  background: #f9fafc;
  display: none;
  right: 0;
  top: 48px;
  padding: 4px;
  border: solid 1px #d0d1d9;
  border-radius: 4px;
  text-align: right;

  &:hover {
    display: block;
  };
`;

const HeaderLinkLi = styled.li`
  list-style: none;

  & > * {
    padding: 8px;
    display: block;
    border: solid 1px transparent;
    margin: 0 4px;
    text-align: center;

    @media (max-width: 700px) {
      margin: 0 1px;
      padding: 4px;
    }
  }
`;

const HeaderLinkMore = styled(HeaderLinkLi)`
  &:hover ~ ${Dropdown} {
    display: block;
  }
`

const HeaderLinkA = styled.a`
  @media (max-width: 700px) {
    margin: 0 1px;
    padding: 4px;
  }

  &:hover {
    border-radius: 3px;
    border: solid 1px #d0d1d9;
    text-decoration: none;
  }
`;

function useWindowSize() {
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

export function Header(props: { siteName: string }) {
  const size: Size = useWindowSize();

  const allSites = [
    { name: "cryptofees.info", url: "https://cryptofees.info/" },
    { name: "cryptoflows.info", url: "https://cryptoflows.info/" },
    { name: "moneyprinter.info", url: "https://moneyprinter.info/" },
    { name: "l2fees.info", url: "https://l2fees.info/" },
    { name: "simplestakers.info", url: "https://simplestakers.info/" },
    { name: "openorgs.info", url: "https://openorgs.info/" },
    { name: "ethburned.info", url: "https://ethburned.info/" },
    { name: "money-movers.info", url: "https://money-movers.info/" },
    { name: "stakers.info", url: "https://stakers.info/" },
    { name: "ethereumnodes.com", url: "https://ethereumnodes.com/" },
  ];

  const currentSite = allSites.find((site) => props.siteName == site.name);
  if (currentSite) {
    const index = allSites.indexOf(currentSite);
    allSites.splice(index, 1);
  }
  let mainSites: { name: string; url: string }[] = [];
  let extraSites: { name: string; url: string }[] = [];

  if (size.width !== undefined) {
    if (size.width >= 330) {
      mainSites = allSites.slice(0, 1);
      extraSites = allSites.slice(1);
    }

    if (size.width >= 768) {
      mainSites = allSites.slice(0, 3);
      extraSites = allSites.slice(3);
    }

    if (size.width >= 1366) {
      mainSites = allSites.slice(0, 4);
      extraSites = allSites.slice(4);
    }

    if (size.width >= 1440) {
      mainSites = allSites.slice(0, 6);
      extraSites = allSites.slice(6);
    }
  }

  return (
    <HeaderMain>
      <HeaderLinks>
        <HeaderLinkLi>
          <div>{currentSite?.name}</div>
        </HeaderLinkLi>
        {mainSites?.map((el: { name: string; url: string }, index) => {
          return (
            <HeaderLinkLi key={index}>
              <HeaderLinkA href={el?.url}>{el?.name}</HeaderLinkA>
            </HeaderLinkLi>
          );
        })}
        <HeaderLinkMore>
          <HeaderLinkA>More</HeaderLinkA>
        </HeaderLinkMore>
        <Dropdown>
          <HeaderLinkUl>
            {extraSites?.map((el: { name: string; url: string }, index) => {
              return (
                <HeaderLinkLi key={index}>
                  <HeaderLinkA href={el?.url}>{el?.name}</HeaderLinkA>
                </HeaderLinkLi>
              );
            })}
          </HeaderLinkUl>
        </Dropdown>
      </HeaderLinks>
    </HeaderMain>
  );
}
