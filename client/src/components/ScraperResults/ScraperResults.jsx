import Link from "./Link";


function ScraperResults({links}) {
  
  console.log(links);
  
    function renderLinks(){
      return links.map((link,idx)=>{
        return <Link link={link} idx={idx} key={idx}/>
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
        {links.length > 0?renderLinks():<NoLinks/>}
     </div>
    </div>
    </>
   );
}

export default ScraperResults;