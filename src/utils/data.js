const names = [
  'Aaran',
  'Aaren',
  'Aarez',
  'Aarman',
  'Aaron',
  'Aaron-James',
  'Aarron',
  'Aaryan',
  'Aaryn',
  'Aayan',
  'Aazaan',
  'Abaan',
  'Abbas',
  'Abdallah',
  'Abdalroof',
  'Abdihakim',
  'Abdirahman',
  'Abdisalam',
  'Abdul',
  'Abdul-Aziz',
  'Abdulbasir',
  'Abdulkadir',
  'Abdulkarem',
  'Smith',
  'Jones',
  'Coollastname',
  'enter_name_here',
  'Ze',
  'Zechariah',
  'Zeek',
  'Zeeshan',
  'Zeid',
  'Zein',
  'Zen',
  'Zendel',
  'Zenith',
  'Zennon',
  'Zeph',
  'Zerah',
  'Zhen',
  'Zhi',
  'Zhong',
  'Zhuo',
  'Zi',
  'Zidane',
  'Zijie',
  'Zinedine',
  'Zion',
  'Zishan',
  'Ziya',
  'Ziyaan',
  'Zohaib',
  'Zohair',
  'Zoubaeir',
  'Zubair',
  'Zubayr',
  'Zuriel',
  'Xander',
  'Jared',
  'Courtney',
  'Gillian',
  'Clark',
  'Jared',
  'Grace',
  'Kelsey',
  'Tamar',
  'Alex',
  'Mark',
  'Tamar',
  'Farish',
  'Sarah',
  'Nathaniel',
  'Parker',
];

const appThoughts = [
  'Coole Sache',
  'Finde ich gut',
  'Was kostet die Welt',
  'I would like to connect',
  'How have you been',
  'Good luck in your future endeavors',
  'Cool Movie ',
  'I like your style',
  'I like this post',
  'Are you into climbing',
  'Wissenswertes ueber Erlangen',
  'My Email has changed',
  'Who is Major Tom',
  'Firefox is the best browser',
  'Running is a very cool hobby',
  'I like your Cooking',
  'Poker players are cool',
  'What is going on',
];

const reactions = [
  {
    reactionBody: 'Great thought',
    username:'Jared'
  },
  {
    reactionBody: 'Agreed',
    username:'Nathaniel'
  },
  {
    reactionBody: 'Find ich auch gut',
    username:'Parker'
  },
  {
    reactionBody: 'ok',
    username:'Zhong'
  },
  {
    reactionBody: 'Good thinking',
    username:'Aarman'
  },
  {
    reactionBody: 'Wow',
    username:'Zerah'
  },
  {
    reactionBody: 'What a great thought',
    username:'Zi'
  },
  {
    reactionBody: 'Really good approach',
    username:'Zidane'
  },
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomUser = () =>
  `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

// Function to generate random thoughts that we can add to users object.
const getRandomThoughts = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtText: getRandomArrItem(appThoughts),
      username: getRandomArrItem(names),
      
    });
  }
  return results;
};

const getRandomReactions = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      
      reactions: getRandomArrItem(reactions),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomUser, getRandomThoughts, getRandomReactions };
