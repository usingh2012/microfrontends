import React, { useRef, useEffect } from "react";
import { mount } from "dashboard/DashboardApp";


export default ({ onSignIn }) => {
  const divRef = useRef(null);
  useEffect(() => {
    if (divRef) {
     mount(divRef.current, );      
    }
  });
  return <div ref={divRef}></div>;
};
