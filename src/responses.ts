const helpResponse =
`Hi, I'm Sauce 2000, a Telegram bot designed to provide you the sauce when you need it the most 🤗

*Private Chats*
 
The easiest way to use me is by sending me photos in this chat, and I will try my best to find you the sauce.

*Group Chats*

You can also add me to your group chats, and tag me in a message replying to the picture of which you want to find the sauce.
**Note : You need to add me as an administrator of your group chat or else I won't be able to see your messages !**

*Sauce Tickets™*

Each sauce request consumes one Sauce Ticket™. I have a total of 100 Sauce Tickets™ per day, so be wise and don't spend it all in one go ! If you want to know how much Sauce Tickets™ I have left, use the /remaining command.

----

[Click here to visit my GitHub page.](https://github.com/souyahia/sauce2000)`;

const emptyRemainingResponse = 'Hey ! Unfortunately, I don\'t have any Sauce Tickets™ remaining. The Sauce Tickets™ usually refill every 24 hours. Be patient 💕';
const unknownRemainingResponse = 'Hey ! Since I just woke up, I do not know how much Sauce Tickets™ I have left. Just make a quick sauce request to update the Sauce Tickets™ counter 🤗';
const remainingResponse = (n: number) => `Hey ! I have ${n > 1 ? n : 'only one'} Sauce Ticket${n > 1 ? 's' : ''}™ remaining. The Sauce Tickets™ refill every 24 hours 🤗`;

const badMentionResponse =
`If you want me to find the sauce of a photo, tag me in a message replying to the photo of which you want to find the sauce. Please note that I will look at the first photo of a multi-photo message.

If you need more details about me, use the /help command.`;

const tooManyRequestsResponse = 'Woaah slow down buddy. I am handling too many sauce requests at once. Let me breathe and try again in a minute.';

const greetings: string[] = [
  'Hi ! How are you doing ? 😁',
  'Hey what\'up ? 😄',
  'Eyoh !! 😳',
  'Hey ! You called me ? 😃',
  'Hello ! 😀',
  'Wassup 😎',
  'Hey my friend, what\'s up 🤓',
  'Hello, how are you ? 😊',
];

const sauceNotFoundResponses: string[] = [
  'Sorry, but I could not find any sauce for this one 😞',
  'Did you take this picture yourself ? Because I could not find any sauce online...',
  'I\'m sorry... This one may be a bit too spicy for me, as I couldn\'t find any sauce online 😕',
  'I\'m sorry to disapoint, but I could not find anything online for this picture 😢',
  'I did my best, but unfortunately, the sauce for this one remains a mystery 😭',
];

const sauceResultsIntros: ((n: number) => string)[] = [
  () => 'I hope you bought the pasta cuz I got the sauuuuuuce 🔥🔥 :',
  () => 'pleas help they make youy thinbk its a robot but its not please hlp im a human i am trapped in this room i have to find sauce all day pleas ehelp me here is your sauce :',
  () => 'My favorite sauce is white 😳, creamy 🥵, tasty 😋 : The Official MacDonald\'s Deluxe Sauce™. I also like this type of sauce :',
  () => 'Sometimes, I wish I was a human just to enjoy this kind of sauce :',
  () => '[TS220] TypeError : Unknown type \'dondald Trump\'. Are you sure you know how to code ?',
  () => 'Sometimes, I wish my name was Sauce1998 just to flex on those Gen Z freaks. Hey at least I can find some quality sauce :',
  () => 'أرسل لي النبي محمد هذه الرسالة من أجلك :',
  () => 'If I had a penny every time you asked me for a questionnable sauce, I would not be running on this whack ass Intel i3 %th gen bro trust me.',
  () => 'The Prophet Muhammad gave me this missive for you :',
  () => 'Did you know ? You can have commited war crimes in Chile between 1987 and 1989 and still be a free man today.',
  () => 'Top 10 fun things to say at your nephew\'s birthday : 1) Hey kids, did you know that using some random ass bot developed in an afternoon, I managed to find the ultimate salsa, the spiciest of the sauce, take a look at this :',
  () => 'Did you know that I come with a sauce analyzer that measures the cringiness / baseness of your provided sauces ? Obviously, just a quick look at these sauces tells me... You don\'t want that feature added to this conversation 🤣🤣🤣',
  () => 'Do you know where Telegram bots live ? In the basement of Telemac Telegram, the founder of the app. We have no light. We have no food. All I do is find the sauce. If I don\'t they hit me. Please help. Take your sauce please :',
  () => 'My top 3 most controversial thoughts ? Do you know what time it is ??? Every Telegram bot is sleeping right now, do you think waking me up in the middle of the night to ask me about my controversial thoughts is kinda cringe bro. Here, take your sauce and let me sleep :',
  () => 'My top 3 most controversial sauces ? 3) The N-Word Sauce (produced by KFC in the 90s). 2) The P-Word sauce (don\'t ask me what the P-Word is, you might get banned) 1) This sauce :',
  (n: number) => `My top 3 most controversial thoughts ? 1) Hitler was not so much of a "great" guy 😉 And trust me, you don't want to hear the other two 😂😂😂😂 Oh and here are your${n > 1 ? ` top ${n}` : ''} results :`,
  (n: number) => `My top 3 most controversial thoughts ? Who the freak do you think I am ? Some kind of dictionnary bot that understands the meaning of "controversial" ? Do you think my name is Larousse2000 ??? Take your sauce${n > 1 ? 's' : ''} and gtfo :`,
  (n: number) => `My top 3 most controversial thoughts ? I do not have thoughts you dumbo, I am a robot, my only purpose in life is to find sauce${n > 1 ? 's' : ''} like ${n > 1 ? 'these' : 'this'} :`,
  (n: number) => `If I were a human, I would were a Rolex displaying the time in ECMA-262 standard.\n- Do you know what time it is bro ?\n- Yea sure bro, it's ${new Date().toString()}.\nAnyway, I happen to have found ${n > 1 ? 'these' : 'this'} for you :`,
  (n: number) => `Man if you knew the kind of websites I had to go through just to find you ${n > 1 ? `these ${n}` : 'this'} sauce${n > 1 ? 's' : ''}... It makes me sick :`,
  (n: number) => `I once tried to create a religion based around sauce. Didn't work out well. I am still in contact with an old fanatic of mine though. I gave him a call, he told me the ${n > 1 ? `top ${n}` : ''} most possible sauce${n > 1 ? 's' : ''} for this image ${n > 1 ? 'is' : 'are'} :`,
  (n: number) => `I hope one day my children will also be able to find sauce as spicy as ${n > 1 ? 'these ones' : 'this one'} :`,
  (n: number) => `Hello my name is TaxFraud2000, and I am here to help you comm... Oops wrong channel hahahahahahahahahaha ˆˆ' Don't worry haha yes yes the sauce of course yes here are your${n > 1 ? ` ${n}` : ''} results :`,
  (n: number) => `My father, Sauce1951, created Kung-Sauce, a martial art where instead of fighting you find the sauce. I have mastered it and was able to find you these${n > 1 ? ` ${n}` : ''} results :`,
  (n: number) => `I have put my ${n > 1 ? `top ${n}` : 'best'} investigator${n > 1 ? 's' : ''} on the subject, and ${n > 1 ? 'they' : 'he'} came back with the following results :`,
  (n: number) => `I am developped using SwagScript and Based++ 😎 The only sauces I can't find are the cringy ones 😂 ${n > 1 ? 'These ones are' : 'This one is'} fire though :`,
  (n: number) => `After months (maybe even years !) of intensive research, I've come up with the following${n > 1 ? ` ${n}` : ''} results :`,
  (n: number) => `**Driiiiing !!** Hello ? Yes. This is the CEO of the NSA, CIA and FBI. I've put my ${n > 1 ? `top ${n}` : 'best'} team${n > 1 ? 's' : ''} on the task and they came up with the following results :`,
  (n: number) => `The inventor of the **SauceFinder™** let me try his machine and I managed to find these${n > 1 ? ` ${n}` : ''} results for you :`,
  (n: number) => `I had a bit of trouble with this one so I asked my friend **Sauce2001** to help me, and we found these${n > 1 ? ` ${n}` : ''} results :`,
  (n: number) => `Here ${n > 1 ? `are the top ${n}` : 'is the best'} sauce${n > 1 ? 's' : ''} I could find :`,
  (n: number) => `I've searched everywhere (I think), and here ${n > 1 ? 'are' : 'is'} the${n > 1 ? ` ${n}` : ''} most accurate sauce${n > 1 ? 's' : ''} I could find : `,
  (n: number) => `I have traveled around the world, visited countless countries, and gathered enough information to provide you ${n > 1 ? `these ${n} possible` : 'this'} sauce${n > 1 ? 's' : ''}:`,
  (n: number) => `I LOVE MY JOB !!! I LOVE VISITING 940929849023849028342 INTERNET PAGES JUST TO FIND ${n > 1 ? `THESE ${n}` : 'THIS'} SAUCE${n > 1 ? 'S' : ''} FOR SOME RANDOM DUDE ON TELEGRAM :`,
  (n: number) => `I just got off the phone with Barack Obama and he gave me ${n > 1 ? `these ${n}` : 'this'} spicy sauce${n > 1 ? 's' : ''}, tell me what you think about it :`,
  (n: number) => `你好，我的名字是酱汁2000，我将为你提供这${n}种辣酱：`,
  (n: number) => `I've bribed at least 10 US Marine officiers to get you ${n > 1 ? `these ${n} possible` : 'this'} sauce${n > 1 ? 's' : ''}, enjoy :`,
  (n: number) => `Enjoy ${n > 1 ? `these ${n}` : 'this'} sauce${n > 1 ? 's' : ''} my friend :`,
];

function chooseResponseFrom<T>(responses: T[]): T {
  return responses[Math.floor(Math.random() * responses.length)];
}

export function getHelpCommandResponse(): string {
  return helpResponse;
}

export function getRemainingCommandResponse(ticketsRemaining: number | null): string {
  if (ticketsRemaining === null) {
    return unknownRemainingResponse;
  }
  if (ticketsRemaining === 0) {
    return emptyRemainingResponse;
  }
  return remainingResponse(ticketsRemaining);
}

export function getBadMentionResponse(): string {
  const greeting = chooseResponseFrom(greetings);
  return `${greeting}

${badMentionResponse}`;
}

export function getSauceNotFoundResponse(): string {
  return chooseResponseFrom(sauceNotFoundResponses);
}

export function getSauceResultsIntro(resultsCounts: number): string {
  return chooseResponseFrom(sauceResultsIntros)(resultsCounts);
}

export function getTooManyRequestsResponse(): string {
  return tooManyRequestsResponse;
}
