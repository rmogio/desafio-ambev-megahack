import React from 'react'

import './styles.css'

export default function CardMusic({music}){
  const{
    title,
    author,
    image_url
  } = music
  return(
    <div className="card-next">
      <img src={image_url} alt="proxima musica"/>
      <div className="card-info-next">
        <strong>{title}</strong>
        <span>{author}</span>
      </div>
    </div>
  )
}