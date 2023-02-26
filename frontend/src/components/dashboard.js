import React, { useEffect, useState } from "react";
import { Requests } from "../utils/index";
const Dashboard = () => {
  const [data, setdata] = useState("");
  useEffect(() => {
    if (localStorage.getItem("formId"))
      Requests.getFormById(localStorage.getItem("formId")).then((res) => {setdata(res.data)});
  }, []);
  return <div>Dashboard</div>;
};

export default Dashboard;
