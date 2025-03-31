import { useCallback } from "react";
import { EditorView } from "codemirror";
import { sql } from "@codemirror/lang-sql";
import { useCodeMirror } from "@uiw/react-codemirror";

interface SQLEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const SQLEditor = ({ value, onChange }: SQLEditorProps) => {
  const handleEditorChange = useCallback((val: string) => {
    onChange(val);
  }, [onChange]);

  const { setContainer } = useCodeMirror({
    value,
    onChange: handleEditorChange,
    extensions: [
      sql(), // SQL syntax highlighting
      EditorView.lineWrapping, // Enable word wrapping
    ],
    basicSetup: {
      lineNumbers: true,
    },
  });

  return (
    <div className="">
      {/* Hidden label for accessibility */}
      <label id="sql-editor-label" style={{ position: "absolute", left: "-9999px" }}>
        SQL Query Editor
      </label>
      <div
        ref={setContainer}
        role="textbox"
        aria-label="SQL Editor"
        aria-multiline="true"
        aria-describedby="sql-editor-desc"
        aria-placeholder="Write your SQL query here..."
        style={{
          fontFamily: "'Fira Code', monospace",
          fontSize: window.innerWidth < 600 ? 12 : 14,
          lineHeight: "20px",
          // minHeight: "125px",
          // maxHeight: "125px",
          height:"125px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          overflowY: "auto",
        }}
      />
    </div>
  );
};
