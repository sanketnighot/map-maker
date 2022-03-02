import React, {useState, useEffect} from 'react';
import {Stage, Layer, Rect} from 'react-konva';
// import MapData from './mapData.json';
import AddImage from './AddImage';
import axios from 'axios';
import ContractConn from './ContractConn'

const Map = () => {
	const [eid, setId] = useState("")
	const [currData, setCurrData] = useState([]);
	const [stage, setStage] = useState({
			scale: 1,
			x: -40,
			y: -40
	});
	const [dataInput, setInput] = useState();

	const [FullMapData, setMapData] = React.useState([]);
	const [msg, setMsg] = useState();
	useEffect(() => {
	const fetchMap = async () => {
		const response = await fetch("http://localhost:8000/map/getMap")
			.then((res) => res.json())
			.then((data) => {
				setMapData(data);
				// console.log("Fetched map");
				// return console.log(FullMapData);
			});
		
		//const fetchedMap = await response.json(response);
		//setMapData(fetchedMap);
		
		}
		fetchMap();
	}, []);
	
	const fetchCurrData = async (getId) => {
		const response = await fetch(`http://localhost:8000/map/getTileById?id=${getId}`)
			.then((res) => res.json())
			.then((data) => {
				setCurrData(data);

			});
	
		
		}
	

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

	const getColor = (land, size, id) => {
		if (id === eid) {
			return "#008080";
		}
		if (land === "LOL" || size === 3) {
			return "#321d70";
		} else if (land === "CITY"){
			return "#d82eee";
		} else if (land === "NEIGHBOUR") {
			return "#a365ef";
		} else if (land === "PREMIUM LAND") {
			return "#f8cdfc";
		} else {
			return "#8a1fae";
		}
	}

	const updateData = () => {
		setMsg("Updating")
		const sendData = {
			x : currData.x,
			y : currData.y,
			update: {
				landType: "PREMIUM_LAND"
			}
		}
		axios.post('http://localhost:8000/map/updateTile', sendData).then(() => setMsg("Updated")).catch(err => {
        setMsg("Error");
		console.log(err);
      });

	}

	const updateTxt = (e) => {
		const { name, value } = e.currentTarget;
		if (name === 'input') {
            setInput(value);
        }
	}

  	const width = 15;
	const Map =  FullMapData.map(
		(data) => {
		if (data.image === "NONE") {
			return(
				
				<>
				<Rect 	x={(data.x * width)+5} 
						y={(-data.y * width)+5} 
						width={width*data.size} 
						height={width*data.size} 
						fill= {getColor(data.landType, data.size, data._id)}
						shadowBlur={(eid === data._id) ? 2 : 0} 
						stroke={(eid === data._id) ? '#81f78e' : 'black'} 
						zIndex={(eid === data._id) ? 5000 : -500} 
						strokeWidth={(eid === data._id) ? 1 : 0.2} 
						onClick={ async ()=>{
							setId(data._id);
							const currId = data._id;
							fetchCurrData(currId);
							//updateData();
							}} 
						onTap={async()=>{
							setId(data._id);
							const currId = data._id;
							fetchCurrData(currId);
						
							}}/>
				</>
			);
		} else {
			return(
				<>
					<AddImage 	x={(data.x * width)+5} 
								y={(-data.y * width)+5} 
								width={width*data.size} 
								height={width*data.size}  
								shadowBlur={(eid === data._id) ? 2 : 0} 
								stroke={(eid === data._id) ? 'green' : '#BBBBBB'} 
								zIndex={(eid === data._id) ? 5000 : -500} 
								strokeWidth={(eid === data._id) ? 0.75 : 0.2} 
								onClick={async()=>{
									setId(data._id);
									const currId = data._id;
									fetchCurrData(currId);
									}} 
								onTap={async ()=>{
									setId(data._id);
									const currId = data._id;
									fetchCurrData(currId);
									}} 
								img={data.image}/>
					<Rect 	x={(data.x * width)+5} 
							y={(data.y * width)+5} 
							width={width*data.size} 
							height={width*data.size} 
							fill={(data.type === "basic" ? "transparent" : "transparent")} 
							shadowBlur={(eid === data._id) ? 2 : 0} 
							stroke={(eid === data._id) ? 'green' : 'transparent'} 
							zIndex={(eid === data._id) ? 5000 : -500} 
							strokeWidth={(eid === data._id) ? 0.75 : 0.2} 
							onClick={async()=>{
								setId(data._id);
								const currId = data._id;
								fetchCurrData(currId);
								}} 
							onTap={async()=>{
								setId(data._id);
								const currId = data._id;
								fetchCurrData(currId);
								}}/>	
				</>
			);
		}
		}
);


    return (

        <>
            <Stage width={window.innerWidth}
                    height={window.innerHeight*(0.65)}
                    onWheel={handleWheel}
                    scaleX={stage.scale}
                    scaleY={stage.scale}
                    x={stage.x}
                    y={stage.y} 
                    draggable={true}
                    style={{backgroundColor:"#63579c"}}>
                <Layer>
				{Map}
                </Layer>
            </Stage>
			<div className="container" style={{display:"flex"}}>
            <div style={{marginLeft:"5%", display: "inlineBlock"}}> 
			{(eid !== "") ? 
				<>
                <h2>Name: {currData.name}</h2> <br/>
				x: <b>{currData.x} </b> ,
				y: <b>{currData.y} </b><br/>
				size: <b>{currData.size} </b> <br/>
				id: <b>{currData.tokenId} </b> <br/>
				land type: <b>{currData.landType} </b> <br/>
				price: <b>{currData.price} ETH </b> <br/>
				status: <b>{currData.status} </b>
				{/* <input name="input" type="text" value={dataInput} onChange={(e) => {updateTxt(e)}} placeholder="Land Type"/> 
				<button onClick={()=>{updateData()}}>Submit</button><br/> */}
				{msg}
				</>:
			 <h1>Click/Tap the Tile to get Data</h1>}
            </div>
			<div style={{margin:"2%"}}> 
				<ContractConn 	
					data = {currData}
				/>
			</div>
			</div>
            
        </>
    )
}

export default Map


