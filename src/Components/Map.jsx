import React, { useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import MapData from "./mapData.json";
import background from "./map.png"
const Map = () => {
  const [eid, setId] = useState(0);

  const [stage, setStage] = useState({
    scale: 1,
    x: 400,
    y: 700,
  });

  const handleWheel = (e) => {
    e.evt.preventDefault();

    const scaleBy = 1.02;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };

    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

    setStage({
      scale: newScale,
      x: (stage.getPointerPosition().x / newScale - mousePointTo.x) * newScale,
      y: (stage.getPointerPosition().y / newScale - mousePointTo.y) * newScale,
    });
  };


  const width = 50;
  const height = 50;
  const Map = MapData.map((data) => {	
			return(
				<Rect id={data.id} x={(data.x * height)+5} y={(data.y * width)+5} width={125} height={125} fill={(data.type === "basic" ? "lightBlue" : "lightPink")} shadowBlur={(eid === data.id) ? 5 : 0} stroke={(eid === data.id) ? 'green' : 'black'} zIndex={(eid === data.id) ? 9 : 0} strokeWidth={(eid === data.id) ? 7 : 5} onClick={(e)=>{setId(data.id);}} onTap={(e)=>{setId(data.id)}}/>
			);
		}
);
 
    return (
      <Rect
        id={data.id}
        x={data.x * height + 5}
        y={data.y * width + 5}
        width={50}
        height={50}
        fill={data.type === "basic" ? "lightBlue" : "lightPink"}
        shadowBlur={eid === data.id ? 5 : 0}
        stroke={eid === data.id ? "green" : "black"}
        zIndex={eid === data.id ? 9 : 0}
        strokeWidth={eid === data.id ? 7 : 5}
        onClick={(e) => {
          setId(data.id);
        }}
        onTap={(e) => {
          setId(data.id);
        }}
      />
    );
  });

  return (
    <>
      <Stage
        width={window.innerWidth}
        height={1300}
        // onWheel={handleWheel}
        // scaleX={stage.scale}
        // scaleY={stage.scale}
        x={stage.x}
        y={stage.y}
        draggable={false}
      >
        <Layer>{Map}</Layer>
      </Stage>
      <div style={{ 

    }}>
        Data:
        {/* Name: {data[eid].name} */}
      </div>
    </>
  );
};

export default Map;
