// phasmophobiahelper.js
document.addEventListener("DOMContentLoaded", async function () {
    const customUrlName = "GameGrumps"; // Replace with the custom URL name
  
    async function getChannelVideos() {
      const url = `https://yt-api-proxy.vercel.app/api/channels/${customUrlName}/videos`;
      
      try {
        const response = await fetch(url);
        const data = await response.json();
  
        const videoList = data.items;
        const videoContainer = document.getElementById("video-list");
  
        videoList.forEach((video) => {
          const videoTitle = video.snippet.title;
          const videoId = video.id.videoId;
  
          const videoItem = document.createElement("div");
          videoItem.classList.add("video-item");
  
          const videoLink = document.createElement("a");
          videoLink.href = `https://www.youtube.com/watch?v=${videoId}`;
          videoLink.target = "_blank";
          videoLink.textContent = videoTitle;
  
          videoItem.appendChild(videoLink);
          videoContainer.appendChild(videoItem);
        });
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    }
  
    getChannelVideos();
  });
  