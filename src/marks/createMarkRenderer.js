import React from 'react';

export default (tagName) => ({ children }) => React.createElement(tagName, null, children);
