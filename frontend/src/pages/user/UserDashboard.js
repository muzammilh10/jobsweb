import { Box, Stack, Typography } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import StatComponent from "../../component/StartComponents";
import { useSelector } from "react-redux";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import moment from "moment";
import { CometChat } from "@cometchat-pro/chat";
import { useEffect } from "react";
import { CometChatUI } from "../../cometchat-pro-react-ui-kit/CometChatWorkspace/src/components/CometChatUI";

const UserDashboard = () => {
  const extractUsername = (email) => {
    const atIndex = email.indexOf("@");
    if (atIndex !== -1) {
      const username = email.substring(0, atIndex);
      return username;
    }
    return null;
  };

  const { user } = useSelector((state) => state.userprofile);
  const { isAuthenticated, userInfo } = useSelector((state) => state.signIn);

  useEffect(() => {
    if (userInfo) {
      let authKey = "e63ce563417fcafa1de6187962db3eb3f80c240b";
      var uid = extractUsername(userInfo.role.email);
      var name = userInfo.role.firstName;
      console.log();

      console.log(uid);

      var user = new CometChat.User(uid);
      console.log(uid);
      user.setName(name);
      CometChat.createUser(user, authKey).then(
        (user) => {
          console.log("user created", user);
        },
        (error) => {
          console.log("error", error);
        }
      );

      CometChat.login(uid, authKey).then(
        (user) => {
          console.log("Login Successful:", { user });
        },
        (error) => {
          console.log("Login failed with exception:", { error });
        }
      );
    }
  }, [userInfo]);

  return (
    <>
      <Box>
        <Typography variant="h4" sx={{ color: "black", pb: 3 }}>
          Dashboard
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <StatComponent
            value={user && moment(user.createdAt).format("YYYY / MM / DD")}
            icon={<CalendarMonthIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
            description="Member since"
            money=""
          />
          <StatComponent
            value={user && user.jobsHistory.length}
            icon={<WorkIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
            description="Number of jobs submitted"
            money=""
          />
        </Stack>
      </Box>
      <div style={{ width: "84vw", height: "800px", marginTop: "25px" }}>
        <CometChatUI />
      </div>
    </>
  );
};

export default UserDashboard;
