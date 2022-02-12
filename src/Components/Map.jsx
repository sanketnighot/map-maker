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

	const getColor = (land) => {
		if (land === "LOL") {
			return "#321d70";
		} else if (land === "RARE"){
			return "#d82eee";
		} else if (land === "ULTRA_PREMIUM") {
			return "#a365ef";
		} else if (land === "PREMIUM") {
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
				landType: "PREMIUM"
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
						fill= {getColor(data.landType)}
						shadowBlur={(eid === data._id) ? 2 : 0} 
						stroke={(eid === data._id) ? '#81f78e' : 'black'} 
						zIndex={(eid === data._id) ? 5000 : -500} 
						strokeWidth={(eid === data._id) ? 1 : 0.2} 
						onClick={ async ()=>{
							setId(data._id);
							const currId = data._id;
							fetchCurrData(currId);
							updateData();
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
                <h1>Name: {currData.owner}</h1> <br/>
				x: {currData.x} ,
				y: {currData.y} <br/>
				size: {currData.size} <br/>
				id: {currData._id} <br/>
				land type: {currData.landType} <br/>
				price: {currData.price} WEI
				<input name="input" type="text" value={dataInput} onChange={(e) => {updateTxt(e)}} placeholder="Land Type"/> 
				<button onClick={()=>{updateData()}}>Submit</button><br/>
				{msg}
				{/* <h2>Location: {FullMapData[eid].x}, {FullMapData[eid].y}</h2>
				<h2>Land Type: {FullMapData[eid].landType} </h2>  */}
				</>:
			 <h1>Click/Tap the Tile to get Data</h1>}
            </div>
			<div style={{margin:"2%"}}> 
				<ContractConn 	
					x = {currData.x}
					y = {currData.y}
					price = {currData.price}
				/>
			</div>
			</div>
            
        </>
    )
}

export default Map
