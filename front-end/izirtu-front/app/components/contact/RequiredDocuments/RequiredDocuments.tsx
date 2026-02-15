import { RequiredDocumentsProps } from "../type/RequiredDocumentsProps";

export function RequiredDocuments({ documents }: RequiredDocumentsProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <ul className="space-y-3">
        {documents.map((doc, index) => (
          <li key={index} className="flex items-center gap-3">
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <span className="text-gray-600">{doc}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}