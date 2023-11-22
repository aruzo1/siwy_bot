import { useCallback } from "react";

export const useCopyToClipboard = (text: string) => {
  const copyToClipboard = useCallback(() => {
    try {
      navigator.clipboard.writeText(text);
    } catch {
      const textField = document.createElement("textarea");
      textField.innerText = text;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand("copy");
      textField.remove();
    }
  }, [text]);

  return copyToClipboard;
};
