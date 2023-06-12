// import * as React from "react";
// import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import { IconButton, useTheme } from "@mui/material";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import { Link } from "react-router-dom";
// import AddIcon from "@mui/icons-material/Add";

// const CardElementFor = ({
//   salary,
//   jobTitle,
//   description,
//   category,
//   location,
//   id,
// }) => {
//   const { palette } = useTheme();
//   return (
//     <Card sx={{ minWidth: 275, mb: 3, mt: 3 }}>
//       <CardContent>
//         <Typography
//           sx={{ fontSize: 15, color: palette.secondary.main, fontWeight: 500 }}
//           gutterBottom
//         >
//           <IconButton>
//             <LocationOnIcon
//               sx={{ color: palette.secondary.main, fontSize: 18 }}
//             />
//           </IconButton>{" "}
//           {location}
//         </Typography>
//         <Typography variant="h5" component="div">
//           {jobTitle}
//         </Typography>
//         <Typography sx={{ mb: 1.5 }} color="text.secondary">
//           {category}
//         </Typography>
//         <Typography variant="body2">
//           Description:{" "}
//           {description?.split(" ")?.slice(0, 15)?.join(" ") + "..."}
//         </Typography>{" "}
//         <Typography variant="h5" component="div">
//           ${salary}
//         </Typography>{" "}
//         <Typography variant="h5" component="div">
//           {location}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

// export default CardElementFor;

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { IconButton, useTheme } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const CardElement = ({ jobTitle, description, category, location, id }) => {
  const { palette } = useTheme();

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography
          sx={{
            fontSize: 14,
            color: palette.secondary.main,
            fontWeight: "bold",
            fontFamily: "Arial, sans-serif",
          }}
          gutterBottom
        >
          <IconButton disableRipple>
            <LocationOnIcon
              sx={{ color: palette.secondary.main, fontSize: 16 }}
            />
          </IconButton>{" "}
          {location}
        </Typography>
        <Typography
          variant="h5"
          component="div"
          sx={{ mb: 1, fontFamily: "Georgia, serif" }}
        >
          {jobTitle}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            fontFamily: "Roboto, sans-serif",
            fontStyle: "italic",
          }}
        >
          {category}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {description?.split(" ")?.slice(0, 15)?.join(" ") + "..."}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          Salary: $4500
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardElement;
