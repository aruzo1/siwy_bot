import { useCopyToClipboard } from "@/hooks";

export const TestItem = ({ name, url }: { name: string; url: string }) => {
  const copyToClipboard = useCopyToClipboard(url);

  return (
    <li>
      {name} -{" "}
      <span
        className="cursor-pointer text-blue-500 transition-colors hover:text-blue-600 active:text-blue-700"
        onClick={copyToClipboard}
      >
        Skopiuj url
      </span>
    </li>
  );
};
