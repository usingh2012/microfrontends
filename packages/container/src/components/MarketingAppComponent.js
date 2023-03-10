import React, { useRef, useEffect } from "react";
import { mount } from "marketing/MarketingApp";
import { useHistory } from "react-router-dom";

export default () => {
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
     });
        history.listen(options.onParentNavigate);
    }
  }, []);
  return <div ref={divRef}></div>;
};
