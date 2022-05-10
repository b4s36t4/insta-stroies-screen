import { Button, Container, Grid, Progress, Spacer } from "@nextui-org/react";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
// import ReactPlayer from "react-player";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

function Onboarding() {
  const ref = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState<undefined | number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const videos = [
    "/videos/short1.mp4",
    "/videos/short1.mp4",
    "/videos/short1.mp4",
  ];
  useEffect(() => {
    console.log(ref);
    if (ref) {
      setDuration((ref?.current?.duration || 0) * 1000);
    }
  }, [ref]);
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
          {videos.map((video, index) => {
            return (
              <div
                key={index}
                style={{
                  position: "relative",
                  //   height: "75vh",
                  display: currentVideoIndex === index ? "block" : "none",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    right: 10,
                    width: "90%",
                    margin: "auto",
                  }}
                >
                  <Progress color={"primary"} size={"xs"} />
                </div>
                <video
                  ref={ref}
                  style={{ height: "100%" }}
                  controls={false}
                  onClick={() => ref.current?.play()}
                  onTimeUpdate={(e: any) => {
                    //   console.log(e.target);
                    const currentTime = e.target?.currentTime * 1000;
                    const percentage = (currentTime / duration!) * 100;
                    setProgress(percentage);
                  }}
                  width={"400px"}
                  height={"75vh"}
                  onSeeked={(e: any) => {
                    const currentTime = e.target?.currentTime * 1000;
                    const percentage = (currentTime / duration!) * 100;
                    setProgress(percentage);
                  }}
                  onEnded={(e) => console.log(e)}
                  disablePictureInPicture={true}
                  // src={video}
                >
                  <source src={video} type={"video/mp4"} />
                </video>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

export default Onboarding;
