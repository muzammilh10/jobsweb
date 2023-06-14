import axios from "axios";
import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const YoutubeVideo = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [Videos, setVideos] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const maxResults = 12;
      const apiKey = "AIzaSyD53f8EOZksI3yzYqusT85aaAFX5Gleec0";
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchKeyword} study Material&type=video&maxResults=${maxResults}&key=${apiKey}`
      );
      const videos = response.data?.items;
      console.log(videos);
      setVideos(videos);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div>
      <AppBar position="static" sx={{ bgcolor: "primary.main", height: 80 }}>
        <Toolbar sx={{ justifyContent: "center" }}>
          <TextField
            label="Search"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            sx={{ backgroundColor: "white", color: "primary.main" }}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{ marginLeft: 2, bgcolor: "secondary.main", color: "white" }}
          >
            Search
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Grid container spacing={3} sx={{ marginTop: 2 }}>
          {Videos.map((video) => (
            <Grid item xs={4} key={video.id.videoId}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                }}
              >
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt=""
                  style={{ height: "200px" }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold" }}
                  >
                    {video.snippet.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {video.snippet.channelTitle}
                  </Typography>
                </CardContent>{" "}
                <div>
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                  >
                    <Button variant="solid" color="danger" size="lg">
                      View Video
                    </Button>
                  </a>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default YoutubeVideo;
