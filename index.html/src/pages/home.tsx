import { useState, useEffect, useRef } from "react";
import { FileText, Upload, Download, Trash2, Wand2, Eye, FileDown, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { DocumentPreview } from "@/components/DocumentPreview";
import { FormattingToolbar } from "@/components/FormattingToolbar";
import { generatePDF } from "@/lib/pdfGenerator";
import { formatText, autoFormatText } from "@/lib/textFormatter";

const initialText = `To Whom It May Concern,

I, Agent Mark, hereby submit this formal petition requesting a full-scale investigation and legal action against Mrs. Jeanette Gomez, and her fiancé, Mr. Kevin Olszewski, for their involvement in multiple alleged financial violations, fraudulent activities, and breach of agreement.

1. Breach of Agreement and Failure to Repay Debt

Earlier this year, Mrs. Jeanette and I reached a clear financial agreement that she would repay me in monthly installments not less than $700 per month. She has failed to comply with this agreement and continues to avoid repayment. To date, I have not received consistent or adequate payments, despite numerous communications and reminders. This ongoing failure suggests willful deceit and financial irresponsibility. I request full restitution of the total owed amount through legal enforcement.

2. Illegal Transfer of Funds Outside the United States

Mrs. Jeanette has also been involved in transferring substantial sums of money internationally without following proper legal channels or fulfilling required tax obligations. These unauthorized transfers may constitute tax evasion, money laundering, and violation of U.S. federal financial laws. I respectfully request that the Internal Revenue Service (IRS), the Department of Justice (DOJ), and the Financial Crimes Enforcement Network (FinCEN) open a formal investigation into her financial activities.

3. Assisting Criminal Scammers

Evidence in my possession shows that Mrs. Jeanette has knowingly sent funds to individuals and online scam networks who have targeted and defrauded both African and American citizens. Her role in facilitating these transactions raises serious concerns about criminal collaboration and aiding fraudulent enterprises operating across borders. I urge federal and international law enforcement agencies, including the FBI Cyber Division and Interpol, to investigate these connections without delay.

⸻

Request for Immediate Action

In light of the serious nature of these allegations, I am calling for:
	•	A full investigation into the financial dealings of Mrs. Jeanette and her fiancé Kevin;
	•	Enforcement of the repayment agreement through legal means;
	•	Forensic accounting of all international transfers made by Mrs. Jeanette;
	•	Legal consequences for any role played in supporting or enabling scam operations.

I am prepared to provide documented evidence and further testimony upon request. The misconduct outlined here not only affects me personally but also represents a broader threat to public trust and national security.

Sincerely,
Agent Mark`;

export default function Home() {
  const [text, setText] = useState(initialText);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [lastUpdated, setLastUpdated] = useState<string>("Never");
  const [isGenerating, setIsGenerating] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const characterCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  useEffect(() => {
    const now = new Date();
    setLastUpdated(now.toLocaleTimeString());
  }, [text]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setText(content);
        toast({
          title: "Success",
          description: "File uploaded successfully",
        });
      };
      reader.readAsText(file);
    }
  };

  const handleClear = () => {
    setText("");
    toast({
      title: "Cleared",
      description: "Document content cleared",
    });
  };

  const handleAutoFormat = () => {
    const formatted = autoFormatText(text);
    setText(formatted);
    toast({
      title: "Success",
      description: "Document auto-formatted",
    });
  };

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      await generatePDF(text);
      toast({
        title: "Success",
        description: "PDF generated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleZoomIn = () => {
    if (zoomLevel < 150) {
      setZoomLevel(zoomLevel + 10);
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 50) {
      setZoomLevel(zoomLevel - 10);
    }
  };

  const applyFormatting = (format: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = text.substring(start, end);

    if (!selectedText) {
      toast({
        title: "Warning",
        description: "Please select text to format",
        variant: "destructive",
      });
      return;
    }

    let replacement = selectedText;

    switch (format) {
      case 'bold':
        replacement = `**${selectedText}**`;
        break;
      case 'italic':
        replacement = `*${selectedText}*`;
        break;
      case 'underline':
        replacement = `__${selectedText}__`;
        break;
      case 'h1':
        replacement = `# ${selectedText}`;
        break;
      case 'h2':
        replacement = `## ${selectedText}`;
        break;
      case 'h3':
        replacement = `### ${selectedText}`;
        break;
      case 'list':
        replacement = `• ${selectedText}`;
        break;
      case 'numbered':
        replacement = `1. ${selectedText}`;
        break;
    }

    const newText = text.substring(0, start) + replacement + text.substring(end);
    setText(newText);
    toast({
      title: "Success",
      description: "Formatting applied",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <FileText className="text-primary text-2xl" />
              <h1 className="text-xl font-semibold text-gray-900">Document Formatter</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center space-x-2"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Text</span>
              </Button>
              <Button
                onClick={handleDownloadPDF}
                disabled={isGenerating}
                className="flex items-center space-x-2 bg-primary hover:bg-blue-700"
              >
                <Download className="w-4 h-4" />
                <span>{isGenerating ? "Generating..." : "Download PDF"}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
            <CardHeader className="border-b border-gray-200">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Document Input
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClear}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Clear
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleAutoFormat}
                    className="text-primary hover:text-blue-700"
                  >
                    <Wand2 className="w-4 h-4 mr-1" />
                    Auto Format
                  </Button>
                </div>
              </div>
              <FormattingToolbar onApplyFormatting={applyFormatting} />
            </CardHeader>
            <CardContent className="p-6">
              <Textarea
                ref={textareaRef}
                value={text}
                onChange={handleTextChange}
                className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Paste your document content here or click 'Upload Text' to load from file..."
              />
              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <span>{characterCount} characters</span>
                <span>{wordCount} words</span>
              </div>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
            <CardHeader className="border-b border-gray-200">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Document Preview
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleZoomOut}
                    disabled={zoomLevel <= 50}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-gray-500">{zoomLevel}%</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleZoomIn}
                    disabled={zoomLevel >= 150}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <DocumentPreview text={text} zoomLevel={zoomLevel} />
            </CardContent>
          </Card>
        </div>

        {/* Status Bar */}
        <Card className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Ready</span>
                </div>
                <div className="h-4 w-px bg-gray-300"></div>
                <span className="text-sm text-gray-600">
                  Last updated: <span>{lastUpdated}</span>
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200"
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview PDF</span>
                </Button>
                <Button
                  onClick={handleDownloadPDF}
                  disabled={isGenerating}
                  size="sm"
                  className="flex items-center space-x-2 bg-orange text-white hover:bg-orange/90"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Generate PDF</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".txt,.md,.doc,.docx"
        className="hidden"
      />
    </div>
  );
}
