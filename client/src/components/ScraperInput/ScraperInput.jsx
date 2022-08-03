import { Button, Chip, TextField, Typography } from '@mui/material';
import Slider from '@mui/material/Slider';
import { useState } from 'react';


function ScraperInput({getScrapedData}) {
  const [keywords, setKeywords] = useState(['hiring','cyber','hiring cyber'])
  const [threshold, setThreshold] = useState(30)
  const [scrollCount, setScrollCount] = useState(10)
  
  function handleDelete(value){
    console.log(value);
    const newKeywords = keywords.filter(e=> e !== value)
    console.log(newKeywords);
    setKeywords(newKeywords)
  }

  function addTags(e){
    if(e.key === "Enter"){
      setKeywords([...keywords, e.target.value])
    } 
  }
 
  function renderTags(){
    return keywords.map((tag,idx)=>{
      return (
        <Chip label={tag} onDelete={()=>handleDelete(tag)}/>
      )
    })
  }

  return ( 
    <>
    <div className='container'>
     <div className='input-wrapper'>
     <Typography id="input-slider" gutterBottom>
        Keywords
      </Typography>
       <div className='tag-input'>
        <ul>
          {renderTags()}
        </ul>
        <input onKeyUp={(e)=>addTags(e)} placeholder='Add tag'/>
       </div>
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