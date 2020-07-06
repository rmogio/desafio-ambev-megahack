import React from 'react'

import './styles.css'

export default function CardMusic({music}){
  const{
    title,
    author,
    image_url
  } = music
  return(
    <div className="card-previous">
      <img src={image_url} alt="musica anterior"/>
      <div className="card-info-previous">
        <strong>{title}</strong>
        <span>{author}</span>
      </div>
    </div>
  )
}