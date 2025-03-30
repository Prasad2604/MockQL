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
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        padding: { top: 16, bottom: 16 },
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
        }
      }}
    />
  );
}; 