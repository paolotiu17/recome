import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../static/logo.svg";
import { ReactComponent as Home } from "../../static/home.svg";
import { Link } from "react-router-dom";
const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: 200px 1fr;
  justify-content: center;
  align-items: center;
  padding: 1em;

  .logo-svg {
    width: 100px;
  }
  .nav-links {
    justify-self: end;
    svg {
      cursor: pointer;
      &:hover {
      }
      width: 3em;
    }
  }
`;
interface Props {}

export const Header: React.FC<Props> = () => {
  return (
    <StyledHeader>
      <Logo className="logo-svg" />
      <div className="nav-links">
        <Link to="/home">
          <Home />
        </Link>
      </div>
    </StyledHeader>
  );
};