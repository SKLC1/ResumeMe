import { Button } from "@mui/material";


function Link({link,idx}) {
  return ( 
    <>
    <div className="container-row">
      <h4>
      <a href={link.url}>POST {idx + 1}</a>
      </h4>
      <h4> ({link.numLikes} Reactions )</h4>
      <button>Save</button>
    </div>
    </>
   );
}

export default Link;