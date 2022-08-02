import axios from "axios";
import { useState } from "react";
import ScraperInput from "./components/ScraperInput/ScraperInput";
import ScraperResults from "./components/ScraperResults/ScraperResults";
import { DotLoader } from "react-spinners"

function App() {
  const [scraperRes, setScraperRes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  

  async function getScrapedData(config){
    
    try {
    const baseURL = "http://localhost:5000" 
     setLoading(true)
     const {data} = await axios.post(`${baseURL}/resume/scrape`,{config})
     console.log(data);
     setScraperRes(data)
     setLoading(false)
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }

  function LoadingMsg(){
    return(
      <div className="container">
         <DotLoader/>
         <h3>Getting Posts</h3>
         <h4>This may take a few minutes...</h4>
      </div>
    )
  }

  return (
    <div>
       <ScraperInput getScrapedData={getScrapedData}/>
       {loading? <LoadingMsg/> :<ScraperResults links={scraperRes}/>}
       <h1>
        {error.message}
       </h1>
    </div>
  );
}

export default App;
