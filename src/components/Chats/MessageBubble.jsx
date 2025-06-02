export default function MessageBubble({ message, isOwn }) {
  return (
    <>
      <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-2`}>
        <div
          className={`rounded-lg px-4 py-2 max-w-md ${
            isOwn ? "bg-blue-100" : "bg-gray-100"
          }`}
        >
          <p className="text-sm">{message.text}</p>
          <span className="text-xs text-gray-500 block text-right">
            {message.time}
          </span>
        </div>
      </div>
    </>
  );
}
