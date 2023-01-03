import React, { useRef, useEffect } from "react";
import { mount } from "auth/AuthApp";
import { useHistory } from "react-router-dom";

export default ({ onSignIn }) => {
  const divRef = useRef(null);
  const history = useHistory();
  useEffect(() => {
    if (divRef) {
     const options = mount(divRef.current, {
        onNavigate: ({ pathname: newPathname }) => {
          const { pathname } = history.location;
          if (pathname !== newPathname) {
            //to avoid infinite loop
            history.push(newPathname);
          }
       },//for communication from child to container/parent.
       initialPath: history.location.pathname,
       onSignIn
     });
        history.listen(options.onParentNavigate);
    }
  }, []);
  return <div ref={divRef}></div>;
};
