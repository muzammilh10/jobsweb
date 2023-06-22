// import axios from "axios";

// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import {
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   AppBar,
//   Toolbar,
//   Container,
//   Box,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import ModalVideo from "react-modal-video";
// import "react-modal-video/scss/modal-video.scss";
// import { useNavigate } from "react-router-dom";
// import Footer from "../Footer";
// import Navbar from "../Navbar";
// const YoutubeVideo = () => {
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [videos, setVideos] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [videoId, setVideoId] = useState("");
//   const [selectedTopic, setSelectedTopic] = useState("");
//   const { userInfo } = useSelector((state) => state.signIn);
//   const navigate = useNavigate();

//   const handleSearch = async () => {
//     try {
//       const maxResults = 12;
//       const apiKey = "AIzaSyDk0Yz3cXwQEcTsn3xPytCOghpM5_i432U";
//       const response = await axios.get(
//         `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchKeyword} ${selectedTopic}&type=video&maxResults=${maxResults}&key=${apiKey}`
//       );
//       const videos = response.data?.items;
//       setVideos(videos);
//     } catch (error) {
//       console.error("Error fetching videos:", error);
//     }
//   };

//   const handleTopicSelect = (event) => {
//     setSelectedTopic(event.target.value);
//   };

//   const openModal = (videoId) => {
//     setVideoId(videoId);
//     setIsOpen(true);
//   };

//   useEffect(() => {
//     if (!userInfo) {
//       navigate("/login");
//     } else {
//       handleSearch();
//     }
//   }, [userInfo, navigate]);

//   return (
//     <div>
//       <Navbar />
//       <AppBar position="static" sx={{ bgcolor: "white", paddingBottom: "7px" }}>
//         <Toolbar sx={{ justifyContent: "center" }}>
//           <TextField
//             label="Search"
//             value={searchKeyword}
//             onChange={(e) => setSearchKeyword(e.target.value)}
//             sx={{
//               backgroundColor: "white",
//               color: "primary.main",
//               mr: 2,
//               "& .MuiInputBase-root": {
//                 height: "40px",
//                 padding: "6px 10px",
//                 display: "flex",
//                 alignItems: "center",
//                 marginTop: "8px",
//               },
//             }}
//           />

//           <Select
//             value={selectedTopic}
//             onChange={handleTopicSelect}
//             variant="outlined"
//             sx={{ mr: 2, height: "40px", marginTop: "8px" }}
//           >
//             <MenuItem value="react,node,angular,pythone">All</MenuItem>
//             <MenuItem value="react">React</MenuItem>
//             <MenuItem value="node">Node</MenuItem>
//             <MenuItem value="angular">Angular</MenuItem>
//             <MenuItem value="pythone">Pythone</MenuItem>
//             <MenuItem value="react-native">ReactNative</MenuItem>
//             <MenuItem value="blockchain">BlockChain</MenuItem>
//             <MenuItem value="android">Android</MenuItem>
//             <MenuItem value="ui-ux">UI-UX</MenuItem>
//           </Select>

//           <Button
//             variant="contained"
//             onClick={handleSearch}
//             sx={{
//               bgcolor: "secondary.main",
//               color: "white",
//               height: "40px",
//               padding: "6px 16px",
//               marginTop: "7px",
//             }}
//           >
//             Search
//           </Button>
//         </Toolbar>
//       </AppBar>
//       <Container sx={{ mt: 5, minHeight: "80vh" }}>
//         <Grid container spacing={3}>
//           {videos.map((video) => (
//             <Grid item xs={12} sm={6} md={4} key={video.id.videoId}>
//               <Card
//                 sx={{
//                   height: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                   width: "100%",
//                   position: "relative",
//                   marginBottom: "50px",
//                 }}
//               >
//                 <img
//                   src={video.snippet.thumbnails.medium.url}
//                   alt=""
//                   style={{
//                     height: "180px",
//                     width: "100%",
//                     objectFit: "cover",
//                   }}
//                 />
//                 <CardContent>
//                   <Typography variant="subtitle1" component="div">
//                     {video.snippet.title}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {video.snippet.channelTitle}
//                   </Typography>
//                 </CardContent>
//                 <Box
//                   sx={{
//                     p: 1,
//                     textAlign: "center",
//                     position: "absolute",
//                     bottom: 0,
//                     left: "30%",
//                   }}
//                 >
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     size="large"
//                     onClick={() => openModal(video.id.videoId)}
//                   >
//                     View Video
//                   </Button>
//                 </Box>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//       <ModalVideo
//         channel="youtube"
//         isOpen={isOpen}
//         videoId={videoId}
//         onClose={() => setIsOpen(false)}
//       />
//       <Footer />
//     </div>
//   );
// };

// export default YoutubeVideo;
//AIzaSyDk0Yz3cXwQEcTsn3xPytCOghpM5_i432U
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  AppBar,
  Toolbar,
  Container,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import Navbar from "../Navbar";

const YoutubeVideo = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [videos, setVideos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const { userInfo } = useSelector((state) => state.signIn);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const maxResults = 12;
      const apiKey = "AIzaSyDk0Yz3cXwQEcTsn3xPytCOghpM5_i432U";
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchKeyword} ${selectedTopic}&type=video&maxResults=${maxResults}&key=${apiKey}`
      );
      const videos = response.data?.items;
      setVideos(videos);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const handleTopicSelect = (event) => {
    setSelectedTopic(event.target.value);
    handleSearch();
  };

  const openModal = (videoId) => {
    setVideoId(videoId);
    setIsOpen(true);
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      handleSearch();
    }
  }, [userInfo, navigate]);

  return (
    <div>
      <Navbar />
      <AppBar position="static" sx={{ bgcolor: "white", paddingBottom: "7px" }}>
        <Toolbar sx={{ justifyContent: "center" }}>
          <TextField
            label="Search"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            sx={{
              backgroundColor: "white",
              color: "primary.main",
              mr: 2,
              "& .MuiInputBase-root": {
                height: "40px",
                padding: "6px 10px",
                display: "flex",
                alignItems: "center",
                marginTop: "8px",
              },
            }}
          />

          <Select
            value={selectedTopic}
            onChange={handleTopicSelect}
            variant="outlined"
            sx={{ mr: 2, height: "40px", marginTop: "8px" }}
          >
            <MenuItem value="react,node,angular,pythone">All</MenuItem>
            <MenuItem value="react">React</MenuItem>
            <MenuItem value="nodejs">Node</MenuItem>
            <MenuItem value="angular">Angular</MenuItem>
            <MenuItem value="pythone">Python</MenuItem>
            <MenuItem value="react-native">React Native</MenuItem>
            <MenuItem value="android">Android</MenuItem>
            <MenuItem value="ui-ux">UI/UX</MenuItem>
          </Select>

          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{
              bgcolor: "secondary.main",
              color: "white",
              height: "40px",
              padding: "6px 16px",
              marginTop: "7px",
            }}
          >
            Search
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 5, minHeight: "80vh" }}>
        <Grid container spacing={3}>
          {videos.map((video) => (
            <Grid item xs={12} sm={6} md={4} key={video.id.videoId}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  position: "relative",
                  marginBottom: "50px",
                }}
              >
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt=""
                  style={{
                    height: "180px",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
                <CardContent>
                  <Typography variant="subtitle1" component="div">
                    {video.snippet.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {video.snippet.channelTitle}
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    p: 1,
                    textAlign: "center",
                    position: "absolute",
                    bottom: 0,
                    left: "30%",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => openModal(video.id.videoId)}
                  >
                    View Video
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId={videoId}
        onClose={() => setIsOpen(false)}
      />
      <Footer />
    </div>
  );
};

export default YoutubeVideo;
