export default function ChatItem({ chat, isActive, onclick }) {
  return (
    <div
      className={`p-3 cursor-pointer hover:bg-gray-200 ${
        isActive ? "bg-gray-300" : ""
      }`}
      onClick={onclick}
    >
      <div className="font-semibold">{chat.name}</div>
      <div className="text-sm text-gray-600">{chat.lastMessage}</div>
      <div className="text-xs text-right text-gray-400">{chat.updatedAt}</div>
    </div>
  );
}
