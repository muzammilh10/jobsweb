import React from "react";
import { useHistory, useParams } from "react-router-dom";
const SendMail = () => {
  //   const history = useHistory();
  const { userEmail, reset } = useParams();
  return (
    <div>
      <h5>email send to the destination{userEmail}</h5>
    </div>
  );
};

export default SendMail;
