import React from "react";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const username = useSelector((state) => state.auth.username);
  return (
    <div>
      Hello
      {username}
    </div>
  );
}
