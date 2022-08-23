// import "./NotFound.css"
// import Lottie from 'react-lottie';
// import animationData from '../../Lotties/NotFound.json'

// const NotFound = props => {
//   const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: animationData,
//     rendererSettings: {
//       preserveAspectRatio: "xMidYMid slice"
//     }
//   };

//     if (!localStorage.getItem("sessionToken")) {
//         window.setTimeout(function () {
//             window.location.href = "/login";
//         }, 2700);
//     } else {
//         window.setTimeout(function () {
//             window.location.href = "/dashboard";
//         }, 2700);
//     }    

//   return (
//     <div class="background-page">
//       <div class="wrapper-forgotpassword"> 
//         <div></div>
//         <div class="bloc-login">
//           <p class="title-register">NOT FOUND</p>
//           <p id="red-notfound"> Redirected in 3 seconds</p>
//           <div class="lottie-notfound">
//             <Lottie options={defaultOptions} height={400} width={400} />
//           </div>
//         </div>
//         <div></div>
//       </div>    
//     </div>
//   );
// };
 
// export default NotFound;