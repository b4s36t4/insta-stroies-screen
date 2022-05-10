import { Button, Container, Grid, Progress, Spacer } from "@nextui-org/react";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
// import ReactPlayer from "react-player";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from "react-icons/bs";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface VideoState {
  duration: number;
  ref: React.RefObject<HTMLVideoElement>;
  src: string;
  playing: boolean;
  muted: boolean;
}

interface videos {
  [key: string | number]: VideoState;
}
function Onboarding() {
  const [duration, setDuration] = useState<undefined | number>(0);
  const [videoState, setVideoState] = useState<VideoState[]>([]);
  const [playing, setPlaying] = useState<boolean>(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const refs = [
    React.useRef<HTMLVideoElement>(null),
    React.useRef<HTMLVideoElement>(null),
    React.useRef<HTMLVideoElement>(null),
  ];
  const [progressState, setProgressState] = useState([0, 0, 0]);
  const videos = [
    "/videos/short1.mp4",
    "/videos/short2.mp4",
    "/videos/short3.mp4",
  ];

  useEffect(() => {
    const videosState: VideoState[] = [];
    for (let index = 0; index < videos.length; index++) {
      const obj: VideoState = {
        duration: 0,
        ref: refs[index],
        src: videos[index],
        playing: false,
        muted: true,
      };
      //   console.log(obj);
      videosState.push(obj);
    }
    setVideoState(videosState);
  }, []);
  useEffect(() => {
    const currentRef = refs[currentVideoIndex];
    if (currentRef) {
      setDuration((currentRef?.current?.duration || 0) * 1000);
    }
  }, [currentVideoIndex, refs]);

  //   useEffect(() => {
  //     const prevVideoRef = refs[currentVideoIndex - 1];
  //     prevVideoRef?.current?.pause();
  //     refs[currentVideoIndex]?.current?.play();
  //   }, [currentVideoIndex]);
  return (
    <div style={{ backgroundColor: "rgba(0,0,0,0.7)", height: "100vh" }}>
      <Head>
        <title>Onboarding</title>
      </Head>
      <Container style={{}} fluid>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
          }}
        >
          {currentVideoIndex > 0 && (
            <AiFillCaretLeft
              onClick={() => {
                if (currentVideoIndex > 0) {
                  refs[currentVideoIndex]?.current?.pause();
                  setCurrentVideoIndex(currentVideoIndex - 1);
                }
              }}
              size={40}
              color={"white"}
            />
          )}
          {(videoState || []).map((video, index) => {
            return (
              <div
                key={index}
                style={{
                  display: currentVideoIndex === index ? "block" : "none",
                  position: "relative",
                  marginTop: 30,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    right: 10,
                  }}
                >
                  <Progress
                    value={progressState[currentVideoIndex]}
                    color={"primary"}
                    size={"xs"}
                  />
                  {video.ref?.current?.muted ? (
                    <BsFillVolumeMuteFill
                      onClick={() => {
                        if (video.ref?.current) {
                          video.muted = false;
                        }
                      }}
                      size={25}
                      style={{ marginTop: 10, float: "right" }}
                      color={"white"}
                    />
                  ) : (
                    <BsFillVolumeUpFill
                      onClick={() => {
                        if (video.ref?.current) {
                          video.muted = true;
                        }
                      }}
                      size={25}
                      style={{ marginTop: 10, float: "right" }}
                      color={"white"}
                    />
                  )}
                </div>
                <video
                  style={{ width: 350, height: 600 }}
                  ref={video.ref}
                  autoPlay={currentVideoIndex === index}
                  muted={video.muted}
                  //   controls={true}
                  onClick={() => {
                    if (progressState[currentVideoIndex] == 100) return;
                    if (video.playing) {
                      video.ref?.current?.pause();
                      video.playing = false;
                    } else {
                      video.ref?.current?.play();
                      video.playing = true;
                    }
                  }}
                  onEnded={(e) => {
                    setTimeout(() => {
                      if (currentVideoIndex < videos.length - 1) {
                        setCurrentVideoIndex(currentVideoIndex + 1);
                      }
                    }, 400);
                  }}
                  //   onLoadedData={(e: any) => {
                  //     video.duration = e.target?.duration * 1000;
                  //   }}
                  onTimeUpdate={(e: any) => {
                    const currentTime = e.target?.currentTime * 1000;
                    const duration = e.target?.duration * 1000;
                    const currentProgress = (currentTime / duration) * 100;
                    const prev = [...progressState];
                    prev[currentVideoIndex] = currentProgress;
                    setProgressState(prev);
                    console.log(currentProgress);
                  }}
                >
                  <source src={video.src} type={"video/mp4"} />
                </video>
                {/* <h1>Next</h1> */}
              </div>
            );
          })}
          {currentVideoIndex < videos.length - 1 && (
            <AiFillCaretRight
              onClick={() => {
                if (currentVideoIndex < videos.length) {
                  refs[currentVideoIndex]?.current?.pause();
                  setCurrentVideoIndex(currentVideoIndex + 1);
                }
              }}
              size={40}
              color={"white"}
            />
          )}
        </div>
      </Container>
    </div>
  );
}

export default Onboarding;
