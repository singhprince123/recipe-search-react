import React from 'react'

export default function LimitExceed() {

    const cardTitle ={
        fontSize: "2.3rem",
        color: "red",
        padding: "0.8rem"
    }
  return (
    <div className=" col-10 col-md-6 mx-auto my-5">

       <div className="card">
          <p className="card-title text-center text-slanted text-uppercase" style={cardTitle}>Apology</p>
          <div className="card-body text-center">
          
          <h2 className="text-capitalize">Sorry, call to <span className="text-slanted text-info">Food2fork</span>  api is exceeded</h2>
        <h3 className="text-capitalize">please , come back tomorrow</h3>
        <h3 className="text-capitalize happy">happy to help you  -)
        </h3>
          </div>
       </div>
       
    </div>
  )
}
