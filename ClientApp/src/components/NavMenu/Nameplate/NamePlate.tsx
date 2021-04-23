import React from "react"
import Particles from "react-tsparticles";

export const NamePlate: React.FC = () => {
  return(
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1
        }}
      >
      <Particles
        id="tsparticles"
        height={100}
        options={{
          background: {
            color: {
              value: "#343a40",
            },
          },
          fpsLimit: 60,
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "out",
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                value_area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              random: true,
              value: 5,
            },
          },
          detectRetina: true,
        }}/>
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 0,
            width: "100%",
            height: "100%",
            color: "white",
            textAlign: "center"
          }}
        >
          <h1>Tyler Mire</h1>
        </div>
      </div>
    </>
  )
};