interface ErrorMessageProps {
  error: string;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  if (!error) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 mb-6 animate-in fade-in">
      <div className="w-5 h-5 text-red-500 shrink-0 mt-0.5">⚠️</div>
      <p className="text-red-700 text-sm">{error}</p>
    </div>
  );
}