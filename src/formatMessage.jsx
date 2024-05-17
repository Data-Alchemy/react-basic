// src/formatMessage.js

import React from 'react';

const formatMessage = (text) => {
  const regexCodeBlock = /```(.*?)```/gs;
  const regexInlineCode = /`([^`]+)`/g;
  const regexBold = /\*\*(.*?)\*\*/g;

  const parts = text.split(regexCodeBlock);

  return parts.map((part, index) => {
    if (index % 2 === 1) {
      // This is the code block part
      return (
        <pre key={index} style={{ background: "#f4f4f4", padding: "10px", borderRadius: "5px" }}>
          {part}
        </pre>
      );
    }

    // Process inline code and bold text
    const inlineParts = part.split(regexInlineCode).map((inlinePart, inlineIndex) => {
      if (inlineIndex % 2 === 1) {
        // This is inline code
        return (
          <code key={inlineIndex} style={{ background: "#f4f4f4", padding: "2px 4px", borderRadius: "3px" }}>
            {inlinePart}
          </code>
        );
      }
      // Process bold text
      const boldParts = inlinePart.split(regexBold).map((boldPart, boldIndex) => {
        if (boldIndex % 2 === 1) {
          // This is bold text
          return (
            <strong key={boldIndex}>
              {boldPart}
            </strong>
          );
        }
        return boldPart;
      });
      return boldParts;
    });

    return <span key={index}>{inlineParts}</span>;
  });
};

export default formatMessage;
