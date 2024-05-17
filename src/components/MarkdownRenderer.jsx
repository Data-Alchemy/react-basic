import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MarkdownRenderer = ({ content }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        console.log('Copied to clipboard successfully!');
      },
      (err) => {
        console.error('Failed to copy: ', err);
      }
    );
  };

  return (
    <ReactMarkdown
      children={content}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          const codeText = String(children).replace(/\n$/, '');
          return !inline ? (
            <div style={{ position: 'relative', marginBottom: '1em' }}>
              <button
                onClick={() => copyToClipboard(codeText)}
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  background: '#333',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  cursor: 'pointer',
                  zIndex: 1,
                }}
              >
                Copy
              </button>
              <SyntaxHighlighter
                style={oneDark}
                language={match ? match[1] : null}
                PreTag="div"
                {...props}
              >
                {codeText}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        }
      }}
    />
  );
};

export default MarkdownRenderer;