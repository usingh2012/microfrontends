import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//Mount function to start the app
const mount = (el) => {
    ReactDOM.render(<App />, el);
}

if (process.env.NODE_ENV === 'development') {
    //this id _marketing-dev-root will be available only development environment
    const devRoot = document.querySelector("#_marketing-dev-root");
    if (devRoot) {
        mount(devRoot);
    }
}

export { mount };