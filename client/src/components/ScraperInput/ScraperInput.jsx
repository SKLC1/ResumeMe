import { Autocomplete, Button, Chip, TextField, Typography } from '@mui/material';
import Slider from '@mui/material/Slider';
import { useState } from 'react';


function ScraperInput({getScrapedData}) {
  const [keywords, setKeywords] = useState(['hiring'])
  const [threshold, setThreshold] = useState(30)
  const [scrollCount, setScrollCount] = useState(10)
  
  return ( 
    <>
    <div className='container'>
     <div className='input-wrapper'>
     <Typography id="input-slider" gutterBottom>
        Keywords
      </Typography>
     <Autocomplete
        multiple
        id="tags-filled"
        options={keywords.map((option) => option)}
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
      <Slider defaultValue={30} onChange={(e)=>setThreshold(e.target.value)} valueLabelDisplay="auto"  />
      <Typography id="input-slider" gutterBottom>
        Search Size
      </Typography>
      <Slider defaultValue={10} max={30} onChange={(e)=>setScrollCount(e.target.value)} valueLabelDisplay="auto"  />
      <div className='display-config'>
       <ul>Keywords: {keywords.length === 0?
       <div>None</div>:
       keywords.map((word)=><li>{word}</li>)}
       </ul>
       <div>Like Threshold: {threshold}</div>
       <div>Search Size: {scrollCount}</div>
      </div>
     <Button onClick={()=>getScrapedData({keywords,threshold,scrollCount})}>Generate</Button>
     </div>
    </div>
    </>
   );
}

export default ScraperInput;