import { CometChat } from "@cometchat-pro/chat";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { CometChatUI } from "../../cometchat-pro-react-ui-kit/CometChatWorkspace/src/components/CometChatUI";

const UserChat = () => {
  const extractUsername = (email) => {
    const atIndex = email.indexOf("@");
    if (atIndex !== -1) {
      const username = email.substring(0, atIndex);
      return username;
    }
    return null;
  };
  const { userInfo } = useSelector((state) => state.signIn);

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
      {" "}
      <div style={{ width: "84vw", height: "800px", marginTop: "25px" }}>
        <CometChatUI />
      </div>
    </>
  );
};

export default UserChat;
