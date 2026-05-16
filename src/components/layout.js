import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { Head, Loader, Nav, Social, Email, Footer } from '@components';
import { GlobalStyle, theme } from '@styles';

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const StyledScrollToTop = styled.button`
  ${({ theme }) => theme.mixins.button};
  position: fixed;
  bottom: 30px;
  right: 80px;
  z-index: 99;
  padding: 10px 15px;
  background-color: var(--navy);
  color: var(--green);
  box-shadow: 0 10px 30px -10px var(--navy-shadow);
  opacity: ${props => (props.show ? 1 : 0)};
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
  transform: translateY(${props => (props.show ? '0' : '20px')});
  border-radius: var(--border-radius);

  &:hover,
  &:focus {
    transform: translateY(-3px);
  }

  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
    padding: 8px 12px;
  }
`;

const Layout = ({ children, location }) => {
  const isHome = location.pathname === '/';
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      const hasLoaded = window.sessionStorage.getItem('hasLoaded');
      return isHome && !hasLoaded;
    }
    return isHome;
  });

  useEffect(() => {
    if (isLoading && isHome && typeof window !== 'undefined') {
      window.sessionStorage.setItem('hasLoaded', 'true');
    }
  }, [isLoading, isHome]);

  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sets target="_blank" rel="noopener noreferrer" on external links
  const handleExternalLinks = () => {
    const allLinks = Array.from(document.querySelectorAll('a'));
    if (allLinks.length > 0) {
      allLinks.forEach(link => {
        if (link.host !== window.location.host) {
          link.setAttribute('rel', 'noopener noreferrer');
          link.setAttribute('target', '_blank');
        }
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (location.hash) {
      const id = location.hash.substring(1); // location.hash without the '#'
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView();
          el.focus();
        }
      }, 0);
    }

    handleExternalLinks();
  }, [isLoading]);

  return (
    <>
      <Head />

      <div id="root">
        <ThemeProvider theme={theme}>
          <GlobalStyle />

          <a className="skip-to-content" href="#content">
            Skip to Content
          </a>

          {isLoading && isHome ? (
            <Loader finishLoading={() => setIsLoading(false)} />
          ) : (
            <StyledContent>
              <Nav isHome={isHome} />
              <Social isHome={isHome} />
              <Email isHome={isHome} />

              <div id="content">
                {children}
                <Footer />
              </div>
            </StyledContent>
          )}

          <StyledScrollToTop
            show={showScrollTop}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to Top">
            &uarr;
          </StyledScrollToTop>
        </ThemeProvider>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
};

export default Layout;
