import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AudioFeature, RecoResults } from "../../../types";
import { ResultTile } from "./ResultTile";
import smoothscroll from "smoothscroll-polyfill";
import { CustomModalStyles, defaultFeature } from "../defaultOptions";
import { useQuery } from "react-query";
import { getTrackFeatures, createPlaylist } from "../../../functions/api";
import { ProgressBar } from "../../index";
import toPairsIn from "lodash.topairsin";
import { useHistory } from "react-router";

import { ReactComponent as Spotify } from "../../../static/spotify.svg";
import { Button, Modal } from "../../index";
import { useUser } from "../../../UserContext";
import { CurrentRecoModal } from "./ModalContent/CurrentRecoModal";
// kick off the polyfill!
smoothscroll.polyfill();
const RecoResultsWrapper = styled.section`
  padding-top: 50px;
  grid-column: 1/-1;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1em;
  .reco-results-header {
    grid-column: 1/-1;
    display: grid;
    grid-template-columns: 1fr 4fr;
    align-items: center;
    gap: 1em;
    .reco-results-options {
      text-align: right;

      .reco-results-button {
        width: 100%;
        max-width: 200px;
        margin: 0;
        /* color: ${(props) => props.theme.darkBg}; */
        background-color: ${(props) => props.theme.buttonBg};
      }
    }
  }

  .no-reco-result {
    text-align: center;
    grid-column: 1/-1;
  }
  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

interface Props {
  results: RecoResults[];
}

const Results: React.FC<Props> = React.memo(({ results }) => {
  const token = localStorage.getItem("token");
  const user = useUser();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReco, setCurrentReco] = useState<RecoResults>(results[0]);
  // const [isPlaying, setIsPlaying] = useState(false);
  const [currentFeature, setCurrentFeature] = useState<AudioFeature>(
    defaultFeature
  );
  const history = useHistory();
  const resultIds = results.map((res) => res.id);
  const features = useQuery(
    "features",
    () => getTrackFeatures(token!, resultIds),
    {
      onError: () => {
        history.push("/");
      },
    }
  );
  useEffect(() => {
    if (features.isSuccess && features.data.audio_features) {
      const raw = (features.data.audio_features as AudioFeature[]).find(
        (x) => x.id === currentReco.id
      );

      if (raw) {
        const cleaned: AudioFeature = {
          id: raw.id,
          acousticness: multiply100(raw.acousticness),
          danceability: multiply100(raw.danceability),
          energy: multiply100(raw.energy),
          instrumentalness: multiply100(raw.instrumentalness),
          loudness: convert(raw.loudness),
          liveness: multiply100(raw.liveness),
          speechiness: multiply100(raw.speechiness),
          valence: multiply100(raw.valence),
        };
        setCurrentFeature(cleaned);
      }
    }
  }, [currentReco, features]);
  useEffect(() => {
    //Smooth scroll results
    const header = document.querySelector("#reco-results");
    setTimeout(() => {
      header?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }, [results]);

  if (!results.length) {
    return (
      <RecoResultsWrapper id="reco-results">
        <div className="no-reco-result">
          <p>😭</p> No songs found for you
        </div>
      </RecoResultsWrapper>
    );
  }

  return (
    <>
      <RecoResultsWrapper id="reco-results">
        <div className="reco-results-header">
          <h1>Results</h1>
          <div className="reco-results-options">
            <Button className="reco-results-button"> Create Playlist</Button>
          </div>
        </div>

        {results.map((data) => {
          return (
            <ResultTile
              key={data.id}
              data={data}
              openModal={openModal}
              setCurrentRecoState={setCurrentRecoState}
            />
          );
        })}
      </RecoResultsWrapper>

      <Modal
        isOpen={isModalOpen}
        style={{
          overlay: {
            ...CustomModalStyles.overlay,
          },
          content: {
            ...CustomModalStyles.content,
            width: "clamp(400px, 90vw, 800px)",
          },
        }}
        onRequestClose={closeModal}
      >
        <CurrentRecoModal
          currentReco={currentReco}
          currentFeature={currentFeature}
        />
      </Modal>
    </>
  );

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal(
    e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
  ) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setIsModalOpen(false);
  }

  function setCurrentRecoState(data: RecoResults) {
    setCurrentReco(data);
  }
});

export default Results;

function multiply100(num: number) {
  return Math.round(num * 100);
}

function convert(x: number) {
  const oldr = 0 - -60;
  const newr = 100;
  const newval = ((x - -60) * newr) / oldr - 0;
  return Math.floor(newval);
}
