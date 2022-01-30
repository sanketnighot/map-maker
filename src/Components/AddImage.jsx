import React, { useEffect, useState } from "react";
import { Stage, Layer, Image } from "react-konva";

export default function AddImage(props) {
  const [image, setImage] = useState(new window.Image());

  useEffect(() => {
    const img = new window.Image();
    img.src = props.img;
    setImage(img);
  }, []);

  return (
        <Image x={props.x} y={props.y} height={15} width={15} image={image} />
  );
}