import { useState } from "react";
import Link from "./Link";


function ScraperResults({links}) {
  const [savedLinks, setSavedLinks] = useState([])

    function renderLinks(posts){
      return posts.map((link,idx)=>{
        return <Link 
        link={link} 
        idx={idx} 
        savedLinks={savedLinks} 
        setSavedLinks={setSavedLinks} 
        key={idx}/>
      })
    }

    
    function renderKeywords(){
      return links.map((postObj)=>{
        return(
          <>
            <div>
             <h3>
              Result for "{postObj.keyword}"
             </h3>
             <ul>
               {renderLinks(postObj.data)}
             </ul>
            </div>
          </>
        )
      })
    }
    
    function renderSavedLinks(){
      return savedLinks.map((linkObj)=>{
        return <div><a href="{linkObj.url}">Saved Post ({linkObj.numLikes} Reactions)</a></div>
      })

    }

    function NoLinks(){
      return(
        <div>No Links</div>
      )
    }

    return ( 
    <>
    <div className="container">
     <h2>RESULTS</h2>
     <div className="container">
        {links.length > 0?renderKeywords():<NoLinks/>}
     </div>
     <h2>SAVED</h2>
     {renderSavedLinks()}
    </div>
    </>
   );
}

export default ScraperResults;