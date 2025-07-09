import { formatText } from "@/lib/textFormatter";

interface DocumentPreviewProps {
  text: string;
  zoomLevel: number;
}

export function DocumentPreview({ text, zoomLevel }: DocumentPreviewProps) {
  const formattedText = formatText(text);

  return (
    <div
      id="documentPreview"
      className="bg-white border border-gray-300 rounded-lg shadow-sm min-h-96 max-h-96 overflow-y-auto"
    >
      <div
        className="p-8 font-serif text-gray-900 leading-relaxed"
        style={{
          transform: `scale(${zoomLevel / 100})`,
          transformOrigin: "top left",
        }}
        dangerouslySetInnerHTML={{ __html: formattedText }}
      />
    </div>
  );
}
