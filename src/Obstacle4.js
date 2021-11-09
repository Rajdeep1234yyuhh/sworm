import React from "react";
export default (props) => {
  return (
    
      <div>
        {props.obsDot4.map((dot, i) => {
          const style = {
            left: `${dot[0]}%`,
            top: `${dot[1]}%`,
          }
          return (<div id="obs4" key={i} style={style}>
          </div>)

        })}
      </div>
  )
}
