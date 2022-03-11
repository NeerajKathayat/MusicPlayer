const play=document.getElementById("Play");
      const music=document.querySelector("audio");
      const img=document.getElementById("circle")
      const artist=document.getElementById("artist")
      const title=document.getElementById("title")
      const prev=document.getElementById("Prev")
      const next=document.getElementById("next")

      let progress=document.getElementById("progress");

      const total_duration=document.getElementById("duration")
      let current_time=document.getElementById("current_time")
      let progress_div=document.getElementById("progress-div")
     let isPlaying= false;
      const playMusic=()=>{
           isPlaying=true;
           music.play();
           play.classList.replace('fa-play','fa-pause');
           img.classList.add("anime")
     }

         const pauseMusic=()=>{
           isPlaying=false;
           music.pause();
           play.classList.replace('fa-pause','fa-play');
           img.classList.remove("anime")
     };
    play.addEventListener('click',()=>{
     if(isPlaying)
     {
         pauseMusic();
     }
     else
     {
         playMusic();
     }
    });

    // changing music data
    
    const songs=[
        {
            name:"Infinity",
          title:"Infinity",
          artist:"Jaymes Young"

        },
          {
          name:"Default",
          title:"Lotus Lane",
          artist:"The Loyalist"
         },
         {
          name:"Sunrise",
          title:"sappheiros",
          artist:"Aurora"
         },
         {
          name:"forest",
          title:"Walking Firiri",
          artist:"Gorkhali Taka"
         }
         ];
    

    const loadSong=(songs)=>{
       
        title.textContent =songs.title;
        artist.textContent =songs.artist;
        music.src="img&music/"+songs.name+".mp3";
        img.src="img&music/"+songs.name+".jpg";
    };

    // loadSong(songs[1]);
      songIndex=0;
    const nextSong=()=>{
        songIndex=(songIndex+1)%songs.length;
        
        loadSong(songs[songIndex])
        playMusic();
        
    }
    const prevSong=()=>{
        if (songIndex==0)
        {
            songIndex=3
        }
        else{
            songIndex=(songIndex-1)%songs.length;
        }
        
        loadSong(songs[songIndex])
        playMusic();
        
    }

      //progress js work
                // progress width updating
        music.addEventListener('timeupdate',(event)=>{
            // console.log(event)
            const{currentTime,duration}=event.srcElement;
            let progress_time=(currentTime/duration)*100;
            progress.style.width=`${progress_time}%`;
           
           //music duration update
           
           let min_duration=Math.floor(duration/60);
           let sec_duration=Math.floor(duration%60);
           
           let tot_duration=`${min_duration}:${sec_duration}`;
          if(duration){
           total_duration.textContent=`${tot_duration}`;
          }

          //current duration update
           
          let min_current_time=Math.floor(currentTime/60);
           let sec_current_time=Math.floor(currentTime%60);
           
           if(sec_current_time<10)
            {
                sec_current_time=`0${sec_current_time}`;
            }
            let tot_current_time=`${min_current_time}:${sec_current_time}`;
           current_time.textContent=`${tot_current_time}`;
        });
           //progress onclick functionality

             progress_div.addEventListener("click",(event)=>{
                const{duration}=music;

            let move_progress=(event.offsetX / event.srcElement.clientWidth)*duration;
            // console.log(move_progress)

            music.currentTime=move_progress;
             });
        
        //  if music ended next song will play
           music.addEventListener('ended',nextSong);


    next.addEventListener('click',nextSong)
    prev.addEventListener('click',prevSong)
