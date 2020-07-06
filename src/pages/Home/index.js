import React, { useState} from 'react';
import axios from 'axios'

import './styles.css'

import Header from '../../components/Header'
import MiddleHeader from '../../components/MiddleHeader'
//import MusicList from '../../components/MusicList'

import CardMusicPrevious from '../../components/CardMusicPrevious'
import CardMusicPlaying from '../../components/CardMusicPlaying'
import CardMusicNext from '../../components/CardMusicNext'

import send from '../../assets/send.svg'
import likeIcon from '../../assets/like.svg'
import dislikeIcon from '../../assets/dislike.svg'

function App() {
  const [musics, setMusics] = useState([]) 

  const fixedMusics = [
    {
      title: 'Are You Ready',
      author: 'AC/DC',
      image_url: 'https://i.scdn.co/image/ab67616d0000b273449b39efb3f857f936fcc305',
      spotify_uri: 'spotify:track:7A1odihHBrI8n9k0Fefh2j',
      likes:0,
      dislikes: 0,
      average:0  
    },
    {
      title: 'Kiss Me',
      author: 'Sixpence None The Richer',
      image_url: 'https://i.scdn.co/image/ab67616d0000b273b182816802535e73e697a1a6',
      spotify_uri: 'spotify:track:754kgU5rWscRTfvlsuEwFp',
      likes:0,
      dislikes: 0,
      average:0
    }
  ]

  const [musicToAdd, setMusicToAdd] = useState('')

  //you must enter an valid spotify token
  const token = 'BQCa0TQ3O18Hv29CscB5A1JNkB1eT4TBKUg4twOwWUGsXqkG8341aCIjKP0mrv8PTid4FnTw5JMx0GEdM_Q9MnCX5VQqhIvTxKA7V2AC8Fo-qdJRDg_hACsrPJnKZZ7PX6q6WegzdxunVYBE0Uax-_tD6VR0zf9cP3PW0N4AR5XDWmPuLdfWh3N7I1zl-C5SUDRQ_EHBDS3quCsJ1yiGttA7hFIIDKhV'

  //you must enter an valid playlist id
  //const playlistID = '1xW6dC9bYbKCMZ9aFKPcYk'

  function orderMusics(a,b){
    return a.average > b.average ? -1 : a.average < b.average ? 1 : 0
  }
  
  async function handleAddMusic(event){
    event.preventDefault();

    const searchResult = await axios.get('https://api.spotify.com/v1/search',{
      params:{
        q: `${musicToAdd}`,
        type: 'track',
        limit:1,
      },
      headers:{
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'content-type': 'application/json',
      }
    })
    const musicData = searchResult.data.tracks.items[0]
    const {name, uri } = musicData
    const image_url = musicData.album.images[0].url
    const author = musicData.album.artists[0].name    

    const newMusic = {
      title: name,
      author,
      image_url,
      spotify_uri: uri,
      likes:0,
      dislikes: 0,
      average:0
    }
    const musicsNow = [...musics, newMusic]
    const orderedMusics = musicsNow.sort(orderMusics)
    setMusics(orderedMusics)
    setMusicToAdd('')
  }

  function handleLikeMusic(musicTitle){
    const updatedMusics = musics.map(music=> {
      if(music.title === musicTitle){
        music.likes += 1
        music.average = music.likes - music.dislikes
        return music
      }else{
        return music
      }
    })
    const orderedMusics = updatedMusics.sort(orderMusics)
    setMusics(orderedMusics)
  }

  function handleDislikeMusic(musicTitle){
    const updatedMusics = musics.map(music=> {
      if(music.title === musicTitle){
        music.dislikes += 1
        music.average = music.likes - music.dislikes
        return music
      }else{
        return music
      }
    })
    const orderedMusics = updatedMusics.sort(orderMusics)
    setMusics(orderedMusics)
  } 


  return (
    <>
      <Header />
      <main>
        <MiddleHeader />
        <section className='music'>
          <div className="form">
            <strong>Digite a música que você quer ouvir!</strong>
            <form className="input-group" onSubmit={handleAddMusic}>
              <input 
                type="text" 
                value={musicToAdd}
                required
                onChange={e=>setMusicToAdd(e.target.value)}
                placeholder='Digite sua musica preferida'/>
              <button type='submit'><img src={send} alt='enviar'/></button>
            </form>
          </div>
          <div className="player">
            {fixedMusics[0] && <CardMusicPlaying music={fixedMusics[0]}/>}
            {fixedMusics[1] && <CardMusicPrevious music={fixedMusics[1]}/>}
            {musics[0] && <CardMusicNext music={musics[0]} />}
          </div>
        </section>
        <>
      <section className='votate'>
        <h2>Vote nas próximas músicas!</h2>
      </section>

        <ul>
          {
            musics.map(music=>(
              <li key={music.title} className='music-item'>
            <div className="music-info">
              <strong>{music.title}</strong>
              <span>{music.author}</span>
            </div>
            <div className="music-status">
              <button onClick={()=> handleLikeMusic(music.title)} className='like'><img src={likeIcon} alt="like"/></button>
            <span className='music-like'>{music.likes}</span>
            </div>
            <div className="music-status">
              <button
              onClick={()=> handleDislikeMusic(music.title)} className='dislike'><img src={dislikeIcon} alt="dislike"/></button>
            <span className='music-dislike'>{music.dislikes}</span>
            </div>
          </li>

            ))
          }
        </ul>
    </>
      </main>
    </>
  );
}

export default App;
