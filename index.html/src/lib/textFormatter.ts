export function formatText(text: string): string {
  if (!text.trim()) {
    return '<p class="text-gray-400 italic">Your formatted document will appear here...</p>';
  }

  let formatted = text
    // Handle paragraphs
    .replace(/\n\s*\n/g, '</p><p class="mb-4">')
    // Handle numbered lists
    .replace(/^\s*(\d+)\.\s+(.+)$/gm, '<div class="mb-2"><strong>$1.</strong> $2</div>')
    // Handle bullet points
    .replace(/^\s*[•·]\s+(.+)$/gm, '<li class="ml-4 mb-1">$1</li>')
    // Handle horizontal rules
    .replace(/^\s*⸻\s*$/gm, '<hr class="my-6 border-gray-300" />')
    // Handle bold text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Handle italic text
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Handle underlined text
    .replace(/__(.+?)__/g, '<u>$1</u>')
    // Handle headers
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mb-2 mt-4">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold mb-3 mt-6">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mb-4 mt-8">$1</h1>');

  return `<p class="mb-4">${formatted}</p>`;
}

export function autoFormatText(text: string): string {
  return text
    // Remove excessive line breaks
    .replace(/\n{3,}/g, '\n\n')
    // Remove excessive spaces
    .replace(/[ \t]+/g, ' ')
    // Remove leading whitespace from lines
    .replace(/^\s+/gm, '')
    // Remove trailing whitespace from lines
    .replace(/\s+$/gm, '');
}
