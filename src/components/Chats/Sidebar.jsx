import ChatItem from "./ChatItems";
export default function Sidebar({ chats, activeChatId, setActiveChatId }) {
  return (
    <div className="w-1/3 border-r overflow-y-auto">
      {chats.map((chat) => {
        <ChatItem
          key={chat.id}
          chat={chat}
          isActive={chat.id === activeChatId}
          onclick={() => setActiveChatId(chat.id)}
        ></ChatItem>;
      })}
    </div>
  );
}
