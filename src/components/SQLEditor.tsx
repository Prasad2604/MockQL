import { default as Editor } from '@monaco-editor/react';
import { useCallback } from 'react';


interface SQLEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const SQLEditor = ({ value, onChange }: SQLEditorProps) => {
  const handleEditorChange = useCallback((value: string | undefined) => {
    onChange(value || '');
  }, [onChange]);

  return (
    <Editor
      height="100%"
      defaultLanguage="sql"
      value={value}
      onChange={handleEditorChange}
      theme="light"
      aria-label="SQL Editor"
      options={{
        minimap: { enabled: false },
        lineHeight: 20,
        fontSize: window.innerWidth < 600 ? 12 : 14,
        fontFamily: "'Fira Code', monospace",
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        padding: {
          top: window.innerWidth < 600 ? 8 : 16,
          bottom: window.innerWidth < 600 ? 8 : 16
        },
        wordWrap: 'on',
        folding: true,
        renderWhitespace: 'none',
        scrollbar: {
          vertical: 'visible',
          horizontal: 'visible',
          useShadows: false,
          verticalScrollbarSize: 10,
          horizontalScrollbarSize: 10,
          verticalSliderSize: 10,
          horizontalSliderSize: 10,
          arrowSize: 30
        },
        accessibilitySupport: "on",
        quickSuggestions: false,
        tabIndex: 0
      }}
    />
  );
}; 