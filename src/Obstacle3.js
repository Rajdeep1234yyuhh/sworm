import React from "react";
export default (props) => {
  return (
    
      <div>
        {props.obsDot3.map((dot, i) => {
          const style = {
            left: `${dot[0]}%`,
            top: `${dot[1]}%`,
          }
          return (<div id="obs3" key={i} style={style}>
          </div>)

        })}
      </div>
  )
}
