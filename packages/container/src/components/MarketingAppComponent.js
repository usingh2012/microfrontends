import React, { useRef, useEffect } from 'react';
import { mount } from 'marketing/MarketingApp';
export default () => {
    const divRef = useRef(null);
    useEffect(() => {
        if (divRef) {
            mount(divRef.current);
         }
    });
    return (
        <div ref = {divRef} ></div>
    )
}