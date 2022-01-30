import React, {useState} from 'react';
import {Image as KonvaImage, Stage, Layer, Rect} from 'react-konva';
import useImage from "use-image";
import MapData from './mapData.json';
// **
import AddImage from './AddImage';
// **

const Map = () => {
const [eid, setId] = useState(0)
const [image] = useImage("Final.png");
const [stage, setStage] = useState({
    scale: 1,
		x: 0,
		y: 0
  });

  const handleWheel = (e) => {
    e.evt.preventDefault();
    const scaleBy = 1.02;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
    };

    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

    setStage({
      scale: newScale,
      x: (stage.getPointerPosition().x / newScale - mousePointTo.x) * newScale,
      y: (stage.getPointerPosition().y / newScale - mousePointTo.y) * newScale
    });
  };

  	const width = 15;
	const Map = MapData.map(
		(data) => {
		if (data.image === "") {
			return(
				
				<>
				<Rect 	x={(data.x * width)+5} 
						y={(data.y * width)+5} 
						width={width} 
						height={width} 
						fill={(data.type === "basic" ? "lightBlue" : "lightPink")} 
						shadowBlur={(eid === data.id) ? 2 : 0} 
						stroke={(eid === data.id) ? 'green' : 'black'} 
						zIndex={(eid === data.id) ? 19 : 0} 
						strokeWidth={(eid === data.id) ? 0.75 : 0.2} 
						onClick={()=>{setId(data.id);}} 
						onTap={()=>{setId(data.id)}}/>
				</>
			);
		} else {
			return(
				<>
				<AddImage 	x={(data.x * width)+5} 
							y={(data.y * width)+5} 
							width={width} 
							height={width}  
							shadowBlur={(eid === data.id) ? 2 : 0} 
							stroke={(eid === data.id) ? 'green' : 'black'} 
							zIndex={(eid === data.id) ? 500 : 0} 
							strokeWidth={(eid === data.id) ? 0.75 : 0.2} 
							onClick={()=>{setId(data.id);}} 
							onTap={()=>{setId(data.id)}} 
							img={data.image}/>
				<Rect 	x={(data.x * width)+5} 
						y={(data.y * width)+5} 
						width={width} 
						height={width} 
						fill={(data.type === "basic" ? "transparent" : "transparent")} 
						shadowBlur={(eid === data.id) ? 2 : 0} 
						stroke={(eid === data.id) ? 'green' : 'transparent'} 
						zIndex={(eid === data.id) ? 50 : 1000} 
						strokeWidth={(eid === data.id) ? 0.75 : 0.2} 
						onClick={()=>{setId(data.id);}} 
						onTap={()=>{setId(data.id)}}/>
				</>
			);
		}
		}
);

// **

// **

 
    return (
        <>
            <Stage width={window.innerWidth}
                    height={window.innerHeight*(0.8)}
                    onWheel={handleWheel}
                    scaleX={stage.scale}
                    scaleY={stage.scale}
                    x={stage.x}
                    y={stage.y} 
                    draggable={true}
                    style={{backgroundColor:"#BBBBBB"}}>
                <Layer>
				{Map}
				
				{/* ** */}
				
				{/* ** */}
                </Layer>
            </Stage>
			<center>
            <div style={{marginLeft:"5%", display: "inlineBlock"}}> 
			{(eid !== 0) ? 
				<>
                <h1>Name: {MapData[eid-1].owner}</h1>
				<h2>Location: {MapData[eid - 1].x}, {MapData[eid - 1].y}</h2>
				<h2>Land Type: {MapData[eid - 1].type} </h2> 
				</>:
			 <h1>Click/Tap the Tile to get Data</h1>}
            </div>
			</center>
            
        </>
    )
}

export default Map
