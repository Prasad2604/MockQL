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
    <div
      ref={setContainer}
      style={{
        fontFamily: "'Fira Code', monospace",
        fontSize: window.innerWidth < 600 ? 12 : 14,
        lineHeight: "20px",
        minHeight: "100px",
        maxHeight: "300px",
        border: "1px solid #ccc",
        borderRadius: "4px",
      }}
    />
  );
};
