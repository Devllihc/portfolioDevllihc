import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .pinterest-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#________';

// Chạy một lần khi mount: mỗi ký tự có start/end ngẫu nhiên, giữa hai mốc đó hiện ký tự nhiễu
const ScrambleText = ({ text }) => {
  const [output, setOutput] = useState(text);

  useEffect(() => {
    const queue = [...text].map(to => {
      const start = Math.floor(Math.random() * 20);
      return { to, start, end: start + Math.floor(Math.random() * 20), char: '' };
    });
    const frameMs = 1000 / 30;
    let frame = 0;
    let last = 0;
    let raf;

    const step = now => {
      if (now - last >= frameMs) {
        last = now;
        let complete = 0;
        let out = '';
        queue.forEach(item => {
          if (item.to === ' ' || frame >= item.end) {
            complete++;
            out += item.to;
          } else if (frame >= item.start) {
            if (!item.char || Math.random() < 0.28) {
              item.char = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
            }
            out += item.char;
          } else {
            out += '\u00a0';
          }
        });
        setOutput(out);
        if (complete === queue.length) {
          setOutput(text);
          return;
        }
        frame++;
      }
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [text]);

  return output;
};

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = (
    <h2 className="big-heading">
      {prefersReducedMotion ? 'Bui Cong Hoang' : <ScrambleText text="Bui Cong Hoang" />}
    </h2>
  );
  const three = (
    <h3 className="small-heading">Software Engineer | Freelancer Filmmaker and Photographer</h3>
  );
  const four = (
    <>
      <p>You can call me Devllihc</p>
    </>
  );
  const five = (
    <a
      className="pinterest-link"
      href="https://www.pinterest.com/mrconghoangg/"
      target="_blank"
      rel="noreferrer">
      Check out my pinterest!
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
