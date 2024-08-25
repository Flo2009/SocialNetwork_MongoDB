const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { getRandomUser, getRandomThoughts, getRandomReactions } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
    // Delete the collections if they exist
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
      await connection.dropCollection('thoughts');
    }

    let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (usersCheck.length) {
      await connection.dropCollection('users');
    }
  
    await User.deleteMany({});
    await Thought.deleteMany({});

  // Create empty array to hold the users and thoughts
  const users = [];
  const thoughtArray = [];

  for (let i = 0; i < 20; i++) {
    const thoughts = getRandomThoughts(20);
    const reactionsArray = getRandomReactions(20);
    const thoughtText = thoughts[0].thoughtText;
    const username = thoughts[0].username;
    const reactions = reactionsArray[0].reactions;
    // console.log(thoughts[1].thoughtText);
    thoughtArray.push({
      thoughtText,
      username,
      reactions,
    })
  };
  const thoughtData = await Thought.create(thoughtArray);
  // Loop 20 times -- add users to the users array and thoughts to thoughtArray
  for (let i = 0; i < 20; i++) {
    // Get some random thoughts objects using a helper function that we imported from ./data
    
    const username = getRandomUser();
    const first = username.split(' ')[0];
    const last = username.split(' ')[1];
    const email = `${first}.${last}@newemail.com`;
    const thoughtIdArray = [...thoughtData.map(({_id}) => _id)];
    const thoughts = thoughtIdArray[i];
    users.push({
      username,
      email,
      thoughts,
      
    });
  }
 
  // console.log(thoughtArray);
  
  // // Add users to the collection and await the results
  
  // for (let i = 0; i < thoughtData; i++){
  //   users.push({
  //     thoughts:  [...thoughtData.map(({_id}) => _id)],
  //   })
  // }
  // console.log(users);
  // Add courses to the collection and await the results
  await User.create(users);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(thoughtArray);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
