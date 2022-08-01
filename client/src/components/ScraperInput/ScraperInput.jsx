import { Autocomplete, Button, Chip, TextField, Typography } from '@mui/material';
import Slider from '@mui/material/Slider';
import axios from 'axios';
import { useState } from 'react';


function ScraperInput() {
  const [keywords, setKeywords] = useState([])
  const [threshold, setThreshold] = useState(0)
  const [scrollCount, setScrollCount] = useState(0)
  
  
  async function getScrapedData(){
    const baseURL = "http://localhost:5000" 
    const {data} = axios.post({baseURL} + '/resume/scrape')
    console.log(data);
  }


  return ( 
    <>
    <div className='input-container'>
     <div className='input-wrapper'>
     <Typography id="input-slider" gutterBottom>
        Keywords
      </Typography>
     <Autocomplete
        multiple
        id="tags-filled"
        options={keywords}
        defaultValue={keywords}
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
            ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label="Keywords"
            placeholder="Add Keyword"
          />
        )}
      />
      <Typography id="input-slider" gutterBottom>
        Like Threshold
      </Typography>
      <Slider defaultValue={0} onChange={(e)=>setThreshold(e.target.value)} valueLabelDisplay="auto"  />
      <Typography id="input-slider" gutterBottom>
        Search Size
      </Typography>
      <Slider defaultValue={0} max={30} onChange={(e)=>setScrollCount(e.target.value)} valueLabelDisplay="auto"  />
      <div className='display-config'>
       <ul>Keywords: {keywords.length === 0?
       <div>None</div>:
       keywords.map((word)=><li>{word}</li>)}
       </ul>
       <div>Like Threshold: {threshold}</div>
       <div>Search Size: {scrollCount}</div>
      </div>
     <Button onClick={getScrapedData}>Generate</Button>
     </div>
    </div>
    </>
   );
}

export default ScraperInput;