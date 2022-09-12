import React, { useState } from "react";

export const Error = (error) => {
  // const [message, setmessage] = useState("エラー");
  console.log(error);
  const message = console.log(error.message);
  //↓messageがundifindになる。stateで管理したい

  return (
    <div>
      <h1>エラー</h1>
      {/* <p>{error_message}</p> */}
    </div>
  );
};

export default Error;
// export default ErrorHandler;
