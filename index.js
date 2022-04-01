// Import the functions you need from the SDKs you need
const admin = require('firebase-admin');
//const getAnalytics = require('firebase/analytics');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const express = require('express');
const app = express();
const PORT = 8080;
app.use(express.json());

const serviceAccount = require('./SERVICE_ACCOUNT_CONFIG.json');

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.listen(PORT, () => console.log(`API 🟢`))

const db = admin.firestore();

app.get('/dupa', async (req, res) =>{
  const doc1 = await getMessages(db, req.query.conv_id);
  const doc2 = await getConversations(db, req.query.user_id);
  res.status(200).send(doc1 + doc2);
});

app.get('/userdata', async (req, res) =>{
  const doc = await getUserData(db, req.query.id);
  res.status(200).send(doc);
});

app.get('/messages', async (req, res) =>{
  const doc = await getMessages(db, req.query.id);
  res.status(200).send(doc);
});

app.get('/conversations', async (req, res) =>{
  const doc = await getConversations(db, req.query.id);
  res.status(200).send(doc);
});

app.get('/posts', async (req, res) =>{
  const doc = await getPosts(db, req.query.id);
  res.status(200).send(doc);
});

app.post('/newpost', async (req, res) =>{
  const doc = await newPost(db, req.query.id, req.query.tags, req.query.hashtags, req.query.images, req.query.text);
  res.status(200).send(doc);
});

app.post('/newconv', async (req, res) =>{
  const doc = await newConversationMessage(db, req.query.user_id, req.query.members, req.query.images, req.query.text);
  res.status(200).send(doc);
});

app.post('/newmsg', async (req, res) =>{
  const doc = await newMessage(db, req.query.id, req.query.images, req.query.text, req.query.conv_id);
  res.status(200).send(doc);
});


async function getUserData(db, user_id) {

  const userRef = db.collection('users').doc(user_id);
  const doc = await userRef.get();

  if (doc.empty) {
    console.log('No matching documents.');
    return;
  } else {
    console.log('Document data:', doc.data());
  }
  let user = {
      user_id: doc.id,
      email: doc.data().email,
      name: doc.data().name,
      following: doc.data().following,
      followers: doc.data().followers
    };
  return user;
}

async function getMessages(db, conversation_id) {

  const msgRef = db.collection('messages');
  const snapshot = await msgRef.where('conv_id', '==', conversation_id).get();
  if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }  

  let msgList = [];
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
    let message = {
      message_id: doc.id,
      author: doc.data().author,
      conv_id: doc.data().conv_id,
      created_at: doc.data().created_at.toString().toHHMMSS(),
      text: doc.data().text
    };

    msgList.push(message);
  });
  
  return msgList;
}

async function getConversations(db, user_id) {

  const convRef = db.collection('conversations');
  const snapshot = await convRef.where('members', 'array-contains-any', [user_id]).get();
  
  if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }  

  let convList = [];
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
    let conversation = {
      conversation_id: doc.id,
      name: doc.data().name,
      members: doc.data().members,
    };

    convList.push(conversation);
  });
  
  return convList;
}


async function getPosts(db, user_id) {
  
  const postsRef = db.collection('posts');
  const snapshot = await postsRef.where('author', '==', user_id).get();
  
  if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }  

  let postsList = [];
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
    let post = {
      post_id: doc.id,
      author: doc.data().author,
      created_at: doc.data().created_at._seconds.toString().toHHMMSS(),
      text: doc.data().text,
      images: doc.data().images,
      seen_by: doc.data().seen_by
    };

    postsList.push(post);
  });
  
  return postsList;
}

async function newMessage(db, user_id, _images, _text, _conv_id) {

  const res = await db.collection('messages').add({
  author: user_id,
  conv_id: _conv_id,
  created_at: Date.now(),
  images: _images,
  text: _text,
  seen_by: {0: user_id}
});

console.log('Added message with ID: ', res.id);

  return 'Added message with ID: '+ res.id;
}

async function newConversationMessage(db, user_id, _members, _images, _text) {
  
  const res = await db.collection('conversations').add({
    members: _members,
    name: _members
  });

  const doc = await newMessage(db, user_id, _images, _text, res.id);

console.log('Added conversation with ID: ', res.id);

  return 'Added conversation with ID: '+ res.id;
}

async function newPost(db, user_id, _tags, _hashtags, _images, _text) {
  
  const res = await db.collection('posts').add({
  author: user_id,
  created_at: 'today',
  images: {0: _images},
  text: _text,
  tags: _tags,
  hashtags: _hashtags,
  seen_by: {0: user_id}
});

console.log('Added document with ID: ', res.id);

  return 'Added document with ID: '+ res.id;
}

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}
