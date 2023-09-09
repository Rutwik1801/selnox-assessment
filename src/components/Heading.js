import React from 'react'

function Heading({title,alignment}) {
  return (
    <div style={{textAlign:alignment}}>
    <h1 style={{fontWeight:600,letterSpacing:"1px",color:"#314363"}}>
        {title}
    </h1>
    </div>
  )
}

export default Heading