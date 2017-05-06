import React from 'react';

export default (tagName) => ({ attributes, children }) => React.createElement(tagName, { ...attributes }, children);
