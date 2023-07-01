
let BASE_URL = "https://www.googleapis.com/youtube/v3";
let API_KEY = "AIzaSyARQXCJLYcUN9EoBboizgy6TPmhYtcaFbY";




async function getVideos(q,type,maxResults){
   let url  = `${BASE_URL}/search?key=${API_KEY}&q=${q}&type=${type}&maxResults=${maxResults}`;
   let response = await fetch(url);
   let data = await response.json();
   console.log(data)
   let videos = data.items;
   getAllVideos(videos);
   console.log(videos)
//    console.log(videos);

}

async function getAllVideos(videos){
   videos.forEach(element => {
      getVideoDetails(element.id.videoId);
   });
}


async function getVideoDetails(videoId){
    let url  = `${BASE_URL}/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`;
    let response = await fetch(url);
    let data = await response.json();
    let item = data.items[0];
    console.log(item);
    let video = document.createElement('div');
    let container = document.getElementById('videos')
    video.className="video";
   
    video.innerHTML = `
   
    <div class="video" onclick="openVideoDetails('${videoId}')">
    <div class="thumbnail-up">
      <img src=${item.snippet.thumbnails.high.url} alt="" srcset="">
      <div class="duration">${item.contentDetails.duration}</div>
    </div>
    <div class="thumbnail-down">
      <div class="left">
         <img src="../image/User-Avatar.png" alt="" srcset="">
      </div>
      <div class="right">
         <div class="thumbnail-title">
             <p>${item.snippet.title}</p>
         </div>
         <div class="thumbnail-desc">
            <p>${item.snippet.description.substring(0,50)}</p>
            <p>15K views.</p>
            <p>1 week ago</p>
         </div>
      </div>
    </div>
   </div>

    `
   container.appendChild(video)
    
}


function openVideoDetails(videoId){
    localStorage.setItem('videoId',videoId);
    window.open("../videoDetails.html");
}


// getVideoDetails(id)
getVideos("","videos",20);


let categories = document.getElementById('categories');

let currIndex = 0;
let allButtons  = document.getElementsByClassName('btn');
let itemWidth = allButtons[0].offsetWidth;
console.log("all buttons are " , allButtons) 

// Function to slide the carousel to the specified index

const previous = document.getElementById('previous-slide');
console.log("previous is" , previous);
const next = document.getElementById('next-slide');
console.log("next is" , next);


const slideCarousel = (index) => {
    categories.style.transform = `translateX(-${itemWidth * index}px)`;
};

function previousSlide(){
console.log("this is previous")
console.log(allButtons.length)
currIndex = currIndex-1;
//    currIndex  = ((currIndex - 1 + parseInt(allButtons.length)));
//    currIndex = currIndex % parseInt(allButtons.length)
   console.log("current index is " , currIndex)
   slideCarousel(currIndex);
}

function nextSlide() {
    console.log("this is next")
    currIndex = ((currIndex + 1) % parseInt(allButtons.length));
    console.log("current index is " , currIndex)
    slideCarousel(currIndex);
}
