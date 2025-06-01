export const mockChats = [
  {
    id: 1,
    name: "Sarah Johnson",
    type: "private",
    lastMessage: "Thanks for your help with my question!",
    updatedAt: "Just now",
    messages: [
      {
        id: 1,
        sender: "Sarah Johnson",
        text: "Hi there! I saw your answer on my question...",
        time: "10:24 AM",
      },
      {
        id: 2,
        sender: "You",
        text: "You're welcome! Did you manage to get it working?",
        time: "10:26 AM",
      },
      {
        id: 3,
        sender: "Sarah Johnson",
        text: "Yes! Your solution with the middleware worked.",
        time: "10:30 AM",
      },
      {
        id: 4,
        sender: "You",
        text: "Great to hear! The App Router has some subtle differences.",
        time: "10:32 AM",
      },
    ],
  },
  {
    id: 2,
    name: "React Developers",
    type: "group",
    lastMessage: "Alex: Has anyone tried the new...",
    updatedAt: "2m",
    membersCount: 12,
    messages: [],
  },
];
