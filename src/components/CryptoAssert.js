/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable arrow-body-style */
import React from 'react'
import { useNavigate } from 'react-router-dom';


const CryptoAssert = ({experts}) => {
    const navigate = useNavigate();
    const push = () => {
      navigate('/user/traderoom')
    }
  
    const saveAsFav = ()=>{
        console.log('save as fav')
      }
  return (
    <div>
           <div className="container">
              <ul className="collection">
                {
                  experts.map((exp,index) => (
                    <li className="collection-item app-py-1" key = {index}  >
                    <div className="row">
                      <div className="col l1 s2" role ="alert" onClick = {push}>
                        <center>
                          <img
                            className="cryptoicons"
                            src= {exp.img}
                            style={{ borderRadius: '5px' }}
                          />
                        </center>
                      </div>
                      <div className="col l8 s4" role = "button" onClick = {push}>
                        <p>{exp.Uppername}</p>
                        <span style={{ fontSize: '12px' }}>{exp.lowerName}</span>
                      </div>
                      <div className="col l2 s4" style={{ paddingTop: '10px' }}>
                        {exp.price}
                      </div>
                      <div className="col l1 s2" style={{ paddingTop: '10px' }} role = "alert" onClick = {saveAsFav}>
                        <span className="material-icons">star_border</span>
                      </div>
                    </div>
                        </li>
                  )

                  )
                }
              </ul>
            </div>
    </div>
  )
}

export default CryptoAssert