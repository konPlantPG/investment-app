import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'

const Header = () => {
  const router = useRouter();

  const linkStyle = {
    marginRight: 100,
    textDecoration: "none",
    color: 'black',
  };

  const headerStyle = {
    backgroundColor: '#49CDBD',
    padding: '40px',
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
  };

  return (
    <div style={headerStyle}>
      <Link href="/" legacyBehavior>
        <a style={{ ...linkStyle, textDecoration: router.pathname === "/" ? "underline" : "none" }}>HOME</a>
      </Link>
      <Link href="/ranking-page" legacyBehavior>
        <a style={{ ...linkStyle, textDecoration: router.pathname === "/ranking-page" ? "underline" : "none" }}>Ranking</a>
      </Link>
      <Link href="/simulation" legacyBehavior>
        <a style={{ ...linkStyle, textDecoration: router.pathname === "/simulation" ? "underline" : "none" }}>Simulation</a>
      </Link>
      <Link href="/trend" legacyBehavior>
        <a style={{ ...linkStyle, textDecoration: router.pathname === "/trend" ? "underline" : "none" }}>Trend</a>
      </Link>
    </div>
  );
};

export default Header;