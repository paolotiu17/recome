import React from "react";
import { Redirect } from "react-router";
import styled from "styled-components";
import { ReactComponent as Glass } from "../../static/glass.svg";
import { CenterGrid } from "../index";
import { HomeTile } from "./HomeTile/HomeTile";
import { ReactComponent as Heart } from "../../static/heart.svg";
import { v4 as uuid } from "uuid";
interface Props {}

const Wrapper = styled(CenterGrid)`
  .hometiles-container {
    display: grid;
    padding: 1em;
    gap: 1em;
    grid-template-columns: repeat(3, 1fr);

    justify-items: center;
  }
  & > a {
    animation: none;
    margin: 0.4em;
  }

  @media (max-width: 768px) {
    .hometiles-container {
      display: flex;
      flex-direction: column;
      gap: 0;

      a {
        margin: 0.5em;
        animation: bottom-in 0.4s ease-in;
      }
    }
  }

  @media (min-width: 768px) {
    a[id="hometile-1"] {
      animation: top-left-in 0.4s ease-in;
    }

    a[id="hometile-2"] {
      animation: top-in 0.4s ease-in;
    }
    a[id="hometile-3"] {
      animation: top-right-in 0.4s ease-in;
    }

    a[id="hometile-4"] {
      animation: bottom-left-in 0.4s ease-in;
    }

    a[id="hometile-5"] {
      animation: bottom-in 0.4s ease-in;
    }

    a[id="hometile-6"] {
      animation: bottom-right-in 0.4s ease-in;
    }
  }

  @keyframes top-left-in {
    0% {
      opacity: 0.1;
      transform: translate(-20%, -20%);
    }
    30% {
      opacity: 0.2;
    }
    100% {
    }
  }

  @keyframes top-right-in {
    0% {
      opacity: 0.1;
      transform: translate(20%, -20%);
    }
    30% {
      opacity: 0.2;
    }
    100% {
    }
  }

  @keyframes bottom-left-in {
    0% {
      opacity: 0.1;
      transform: translate(-20%, 20%);
    }
    30% {
      opacity: 0.2;
    }
    100% {
    }
  }

  @keyframes bottom-right-in {
    0% {
      opacity: 0.1;
      transform: translate(20%, 20%);
    }
    30% {
      opacity: 0.2;
    }
    100% {
    }
  }

  @keyframes top-in {
    0% {
      opacity: 0.1;
      transform: translateY(-20%);
    }
    30% {
      opacity: 0.2;
    }
    100% {
    }
  }

  @keyframes bottom-in {
    0% {
      opacity: 0.1;
      transform: translateY(20%);
    }
    30% {
      opacity: 0.2;
    }
  }

  @keyframes bottom-in {
    0% {
      opacity: 0.1;
      transform: translateY(20%);
    }
    30% {
      opacity: 0.2;
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const Home: React.FC<Props> = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Redirect to="/login" />;
  }
  return (
    <Wrapper>
      <div className="hometiles-container">
        <HomeTile
          header="Recommend"
          desc="Get recommandations based on metrics tuned to your liking. "
          icon={() => <Glass />}
          path="/recommend"
          key={uuid()}
          id={"hometile-" + 1}
        />
        <HomeTile
          header="Favorites"
          desc="See your top tracks and artists from  different time ranges. "
          icon={() => <Heart id="heart" />}
          path="/favorites"
          key={uuid()}
          id={"hometile-" + 2}
        />
      </div>
    </Wrapper>
  );
};
