import React, { useRef, useMemo, useState, useEffect } from "react";
import JoditEditor from "jodit-react";

const TextEditor = ({ placeholder, news, handleChangeNews, loading }) => {
  const editor = useRef(null);
  const [content, setContent] = useState(news?.content || "");

  const config = useMemo(
    () => ({
      readonly: loading ? true : false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || "Start typing...",
      minHeight: "300px", // Set the desired height here
    }),
    [placeholder, loading] // Include loading as a dependency to update config when it changes
  );

  useEffect(() => {
    setContent(news?.content || ""); // Update content state when news changes
  }, [news]);

  useEffect(() => {
    handleChangeNews(content);
  }, [content]);

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1} // tabIndex of textarea
      onChange={(newContent) => setContent(newContent)}
    />
  );
};

export default TextEditor;
