// import './App.css';
import Map from './Components/Map';
import background from './Components/map.png'

function App() {
  return (
    <div className="App" style={{
      backgroundImage: `url(${background})`,
      overflowX: 'scroll', whiteSpace:'nowrap',
      backgroundRepeat: 'no-repeat',
      backgroundSize:'cover',
     height:'100%',
      backgroundPosition:'center',
      backgroundAttachment: 'local',
      // width: '100vw',
      height: '300vh'
    }}>
      <Map/>
    </div>
  );
}

export default App;
