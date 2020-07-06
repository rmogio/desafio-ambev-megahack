import React from 'react'

import './styles.css'

export default function CardMusic({music}){
  const{
    title,
    author,
    image_url
  } = music

  return(
    <div className="card-playing">
      <img src={image_url} alt="musica atual"/>
      <div className="card-info-playing">
        <strong>{title}</strong>
        <span>{author}</span>
      </div>
    </div>
  )
}