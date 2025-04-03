"use client";
import React, { useRef } from "react";
import "./page.css";
import {
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
} from "./image-data";

import Image from "next/image";
import { gsap } from "gsap";
const Home = () => {
  const plane1 = useRef(null);
  const plane2 = useRef(null);
  const plane3 = useRef(null);

  let requestAnimationFrameId = null;
  let xForce = 0;
  let yForce = 0;
  const easing = 0.08;
  const speed = 0.01;

  const manageMouseMove = (e) => {
    const { movementX, movementY } = e;
    xForce += movementX * speed;
    yForce += movementY * speed;
    if (requestAnimationFrameId == null) {
      requestAnimationFrameId = requestAnimationFrame(animate);
    }
  };

  const lerp = (start, target, amount) =>
    start * (1 - amount) + target * amount;

  const animate = () => {
    xForce = lerp(xForce, 0, easing);
    yForce = lerp(yForce, 0, easing);

    gsap.set(plane1.current, {
      x: `+=${xForce * 0.6}`,
      y: `+=${yForce * 0.6}`,
    });
    gsap.set(plane2.current, {
      x: `+=${xForce * 0.5}`,
      y: `+=${yForce * 0.5}`,
    });

    gsap.set(plane3.current, {
      x: `+=${xForce * 0.25}`,
      y: `+=${yForce * 0.25}`,
    });

    if (Math.abs(xForce) < 0.01) xForce = 0;
    if (Math.abs(yForce) < 0.01) yForce = 0;

    if (xForce != 0 || yForce != 0) {
      requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestAnimationFrameId);
      requestAnimationFrameId = null;
    }
  };

  return (
    <>
      <main
        onMouseMove={(e) => {
          manageMouseMove(e);
        }}
        className="main"
      >
        <div className="title">
          <h1>Floating Image Gallery</h1>
        </div>

        <div ref={plane1} className="plane">
          <Image
            className="img1"
            src={img1}
            alt="Floating"
            width={130}
           
          />
          <Image className="img2" src={img2} alt="Floating" width={200} />
          <Image className="img3" src={img3} alt="Floating" width={200} />
        </div>

        <div ref={plane2} className="plane">
          <Image className="img4" src={img4} alt="Floating" width={200} />
          <Image className="img5" src={img5} alt="Floating" width={220} />
          <Image className="img6" src={img6} alt="Floating" width={220} />
        </div>

        <div ref={plane3} className="plane">
          <Image className="img7" src={img7} alt="Floating" width={200} />
          <Image className="img8" src={img8} alt="Floating" width={200} />
          <Image className="img9" src={img9} alt="Floating" width={200} />
        </div>
      </main>
    </>
  );
};

export default Home;
