// let listContainer,
//   timeout = null, delay =5;

// function getRandomInt(max) {
//   return Math.floor(Math.random() * max);
// }

// function autoPlayTiktok() {
//   let activeVideo = document.getElementsByTagName("video")[0];

//   if (activeVideo) {
//     let timeoutExtra = activeVideo.duration + delay;
//     let src = activeVideo.src;
//     const intervalItme = timeoutExtra * 1000;

//     timeout = setTimeout(() => {
//       let listContainer = document.body.querySelectorAll(
//         "div[data-e2e='recommend-list-item-container']"
//       );
//       listContainer[getRandomInt(listContainer.length)].scrollIntoView();
//       clearTimeout(timeout);
//       autoPlayTiktok();
//     }, intervalItme);
//   }
// }
// autoPlayTiktok(0);
