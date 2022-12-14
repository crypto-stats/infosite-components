import React, { useState, useEffect } from 'react';
import classes from './Header.module.css';

interface Size {
  width: number | undefined;
  height: number | undefined;
}


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
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
}

export function Header(props: { siteName: string}) {
  const size: Size = useWindowSize()

  const allSites = [
    { name: 'cryptofees.info', url: 'https://cryptofees.info/' },
    { name: 'cryptoflows.info', url: 'https://cryptoflows.info/' },
    { name: 'moneyprinter.info', url: 'https://moneyprinter.info/' },
    { name: 'l2fees.info', url: 'https://l2fees.info/' },
    { name: 'simplestakers.info', url: 'https://simplestakers.info/' },
    { name: 'openorgs.info', url: 'https://openorgs.info/' },
    { name: 'ethburned.info', url: 'https://ethburned.info/' },
    { name: 'money-movers.info', url: 'https://money-movers.info/' },
    { name: 'stakers.info', url: 'https://stakers.info/' },
    { name: 'ethereumnodes.com', url: 'https://ethereumnodes.com/' },
  ];

  const currentSite = allSites.find((site) => props.siteName == site.name);
  if (currentSite) {
    const index = allSites.indexOf(currentSite);
    allSites.splice(index, 1);
  }
  let mainSites: { name: string; url: string }[] = [];
  let extraSites: { name: string; url: string }[] = [];

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

  return (
    <header>
      <ul className={classes["header-links"]}>
        <li className={classes["header-link"]}>
          <div>{currentSite?.name}</div>
        </li>
        {mainSites?.map((el: { name: string; url: string }, index) => {
          return (
            <li key={index} className={classes["header-link"]}>
              <a href={el?.url}>{el?.name}</a>
            </li>
          );
        })}
        <li className={classes["header-link"]}>
          <a>More</a>

          <ul className={classes["dropdown"]}>
            {extraSites?.map((el: { name: string; url: string }, index) => {
              return (
                <li key={index} className={classes["header-link"]}>
                  <a href={el?.url}>{el?.name}</a>
                </li>
              );
            })}
          </ul>
        </li>
      </ul>
    </header>
  );
}
