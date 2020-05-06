import React from 'react';
import styled from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Dot = styled.div`
  background-color: ${({ theme }) => theme.red};
  color: white;
  border-radius: 50%;
  padding: 5px;
  line-height: 20px;
  min-width: 30px;
  margin-left: 10px;
  font-weight: 100;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`;

const AnimationStyles = styled.span`
  position: relative;
  /* transform-style: preserve-3d; */
  .count {
    display: block;
    position: relative;
    transition: all 0.4s;
    backface-visibility: hidden;
    will-change: transform;
  }
  .count-enter {
    transform: rotate3d(1, 0, 0, 0.5turn);
  }
  .count-enter-active {
    transform: rotate3d(1, 0, 0, 0);
  }
  .count-exit {
    top: 0;
    position: absolute;
    transform: rotate3d(1, 0, 0, 0);
  }

  .count-exit-active {
    transform: rotate3d(1, 0, 0, 0.5turn);
  }
`;

export default function CartCount({ count }) {
  return (
    <AnimationStyles>
      <TransitionGroup>
        <CSSTransition
          key={count}
          timeout={{ enter: 400, exit: 400 }}
          unmountOnExit
          classNames="count"
          className="count"
        >
          <Dot>{count}</Dot>
        </CSSTransition>
      </TransitionGroup>
    </AnimationStyles>
  );
}
