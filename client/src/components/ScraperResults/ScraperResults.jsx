import Link from "./Link";


function ScraperResults({links}) {
  
    function renderLinks(posts){
      return posts.map((link,idx)=>{
        return <Link className="link" link={link} idx={idx} key={idx}/>
      })
    }
    
    function renderKeywords(){
      return links.map((postObj)=>{
        return(
          <>
            <div>
             <h3>
              Result for {postObj.keyword}
             </h3>
             <ul>
               {renderLinks(postObj.data)}
             </ul>
            </div>
          </>
        )
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
    </div>
    </>
   );
}

export default ScraperResults;