import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bold, Italic, Underline, List, ListOrdered } from "lucide-react";

interface FormattingToolbarProps {
  onApplyFormatting: (format: string) => void;
}

export function FormattingToolbar({ onApplyFormatting }: FormattingToolbarProps) {
  return (
    <div className="mt-4 flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onApplyFormatting("bold")}
        className="formatting-btn"
      >
        <Bold className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onApplyFormatting("italic")}
        className="formatting-btn"
      >
        <Italic className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onApplyFormatting("underline")}
        className="formatting-btn"
      >
        <Underline className="w-4 h-4" />
      </Button>
      
      <Separator orientation="vertical" className="h-4" />
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => onApplyFormatting("h1")}
        className="formatting-btn"
      >
        H1
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onApplyFormatting("h2")}
        className="formatting-btn"
      >
        H2
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onApplyFormatting("h3")}
        className="formatting-btn"
      >
        H3
      </Button>
      
      <Separator orientation="vertical" className="h-4" />
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => onApplyFormatting("list")}
        className="formatting-btn"
      >
        <List className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onApplyFormatting("numbered")}
        className="formatting-btn"
      >
        <ListOrdered className="w-4 h-4" />
      </Button>
    </div>
  );
}
