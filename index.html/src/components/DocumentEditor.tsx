import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Bold, Italic, Underline, List, ListOrdered, Type, AlignLeft, AlignCenter, AlignRight } from "lucide-react";

interface DocumentEditorProps {
  value: string;
  onChange: (value: string) => void;
  onApplyFormatting: (format: string) => void;
  characterCount: number;
  wordCount: number;
}

export function DocumentEditor({ value, onChange, onApplyFormatting, characterCount, wordCount }: DocumentEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedText, setSelectedText] = useState("");
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      const handleSelection = () => {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selected = value.substring(start, end);
        
        setSelectedText(selected);
        setSelectionStart(start);
        setSelectionEnd(end);
      };

      textarea.addEventListener('mouseup', handleSelection);
      textarea.addEventListener('keyup', handleSelection);
      textarea.addEventListener('select', handleSelection);

      return () => {
        textarea.removeEventListener('mouseup', handleSelection);
        textarea.removeEventListener('keyup', handleSelection);
        textarea.removeEventListener('select', handleSelection);
      };
    }
  }, [value]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const insertText = (before: string, after: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    onChange(newText);
    
    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const handleFormatting = (format: string) => {
    switch (format) {
      case 'bold':
        insertText('**', '**');
        break;
      case 'italic':
        insertText('*', '*');
        break;
      case 'underline':
        insertText('__', '__');
        break;
      case 'h1':
        insertText('# ');
        break;
      case 'h2':
        insertText('## ');
        break;
      case 'h3':
        insertText('### ');
        break;
      case 'list':
        insertText('• ');
        break;
      case 'numbered':
        insertText('1. ');
        break;
      case 'quote':
        insertText('> ');
        break;
      case 'code':
        insertText('`', '`');
        break;
      case 'link':
        insertText('[', '](url)');
        break;
    }
  };

  const insertTemplate = (template: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const newText = value.substring(0, start) + template + value.substring(start);
    onChange(newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + template.length, start + template.length);
    }, 0);
  };

  return (
    <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
      <CardHeader className="border-b border-gray-200">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Advanced Document Editor
        </CardTitle>
        
        {/* Enhanced Formatting Toolbar */}
        <div className="space-y-3">
          {/* Text Formatting */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Format:</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFormatting("bold")}
              className="formatting-btn"
              title="Bold"
            >
              <Bold className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFormatting("italic")}
              className="formatting-btn"
              title="Italic"
            >
              <Italic className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFormatting("underline")}
              className="formatting-btn"
              title="Underline"
            >
              <Underline className="w-4 h-4" />
            </Button>
            
            <Separator orientation="vertical" className="h-4" />
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFormatting("h1")}
              className="formatting-btn"
              title="Heading 1"
            >
              H1
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFormatting("h2")}
              className="formatting-btn"
              title="Heading 2"
            >
              H2
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFormatting("h3")}
              className="formatting-btn"
              title="Heading 3"
            >
              H3
            </Button>
            
            <Separator orientation="vertical" className="h-4" />
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFormatting("list")}
              className="formatting-btn"
              title="Bullet List"
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFormatting("numbered")}
              className="formatting-btn"
              title="Numbered List"
            >
              <ListOrdered className="w-4 h-4" />
            </Button>
          </div>

          {/* Document Templates */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Templates:</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => insertTemplate("Dear [Name],\n\n[Content]\n\nSincerely,\n[Your Name]")}
              className="text-xs"
            >
              Letter
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => insertTemplate("MEMORANDUM\n\nTO: [Recipient]\nFROM: [Your Name]\nDATE: [Date]\nSUBJECT: [Subject]\n\n[Content]")}
              className="text-xs"
            >
              Memo
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => insertTemplate("REPORT\n\nExecutive Summary:\n[Summary]\n\nBackground:\n[Background]\n\nFindings:\n[Findings]\n\nRecommendations:\n[Recommendations]")}
              className="text-xs"
            >
              Report
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Selection Info */}
          {selectedText && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-800">
                  Selected: "{selectedText.substring(0, 50)}{selectedText.length > 50 ? "..." : ""}"
                </span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onApplyFormatting("bold")}
                    className="text-xs"
                  >
                    Bold
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onApplyFormatting("italic")}
                    className="text-xs"
                  >
                    Italic
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Main Editor */}
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={handleTextChange}
            className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none font-mono text-sm"
            placeholder="Start typing your document here..."
          />

          {/* Document Stats */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <span>{characterCount} characters</span>
              <span>{wordCount} words</span>
              <span>Lines: {value.split('\n').length}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>Cursor: {selectionStart}</span>
              {selectedText && <span>Selected: {selectedText.length}</span>}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-2 pt-2 border-t border-gray-200">
            <span className="text-sm font-medium text-gray-700">Quick Actions:</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => insertText('\n---\n')}
              className="text-xs"
            >
              Add Separator
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => insertText('\n\n')}
              className="text-xs"
            >
              Add Paragraph
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => insertText(`\n\nDate: ${new Date().toLocaleDateString()}\n\n`)}
              className="text-xs"
            >
              Insert Date
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
