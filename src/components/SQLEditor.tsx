import Editor from '@monaco-editor/react';

interface SQLEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const SQLEditor = ({ value, onChange }: SQLEditorProps) => {
  return (
    <Editor
      height="100%"
      defaultLanguage="sql"
      value={value}
      onChange={(value) => onChange(value || '')}
      theme="light"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        padding: { top: 8, bottom: 8 },
        wordWrap: 'on'
      }}
    />
  );
}; 