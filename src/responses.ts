const helpResponse =
`Hi, I'm Sauce 2000, a Telegram bot designed to provide you the sauce when you need it the most 🤗

*Private Chats*
 
The easiest way to use me is by sending me photos in this chat, and I will try my best to find you the sauce.

*Group Chats*

You can also add me to your group chats, and tag me in a message replying to the picture of which you want to find the sauce.
**Note : You need to add me as an administrator of your group chat or else I won't be able to see your messages !**

----

[Click here to visit my GitHub page.](https://github.com/souyahia/sauce2000)`;

const badMentionResponse =
`If you want me to find the sauce of a photo, tag me in a message replying to the photo of which you want to find the sauce. Please note that I will look at the first photo of a multi-photo message.

If you need more help, use the /help command in a private conversation with me.`;

const greetings = [
  'Hi ! How are you doing ? 😁',
  'Hey what\'up ? 😄',
  'Eyoh !! 😳',
  'Hey ! You called me ? 😃',
  'Hello ! 😀',
  'Wassup 😎',
  'Hey my friend, what\'s up 🤓',
  'Hello, how are you ? 😊',
];

function chooseResponseFrom(responses: string[]): string {
  return responses[Math.floor(Math.random() * responses.length)];
}

export function getHelpCommandResponse(): string {
  return helpResponse;
}

export function getBadMentionResponse(): string {
  const greeting = chooseResponseFrom(greetings);
  return `${greeting}

${badMentionResponse}`;
}
