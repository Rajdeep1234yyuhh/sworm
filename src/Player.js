import React from "react";
export default (props) => {
  return (
    
      <div>
        {props.snakeDot.map((dot, i) => {
          const style = {
            left: `${dot[0]}%`,
            top: `${dot[1]}%`,
          }
          return (<div id="snake" key={i} style={style}></div>)

        })}
      </div>
  )
}
