const express = require('express');
const router = express.Router();

const Post = require('../models/post.model');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    const nameImage = Date.now() + '-bulletin-board-' + file.originalname;
    cb(null, nameImage);
  },
});
let upload = multer({ storage });

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find({status: 'published'})
      .select('author created title photo')
      .sort({created: -1});
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result.map(post => {
      console.log('post', post);
      return {
        _id: post.id,
        author: post.author,
        created: post.created,
        updated: post.updated,
        status: post.status,
        title: post.title,
        text: post.text,
        photo: `http://localhost:8000/${post.photo}`,
        price: post.price,
        phone: post.phone,
        location: post.location,
      };
    }));
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post
      .findById(req.params.id);
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json({
      ...result,
      photo: `http://localhost:8000/${result.photo}`,
    });

  }
  catch(err) {
    res.status(500).json(err);
    console.error(err);
  }
});

router.post('/posts/add', upload.single('file'), async (req, res) => {
  try {

    const { title, text, author, created, updated, status, photo, price, phone, location} = req.body;

    console.log('req.body', req.body);

    const authorPattern = new RegExp('^[a-zA-Z0-9][a-zA-Z0-9_.-]+@[a-zA-Z0-9][a-zA-Z0-9_.-]+\.{1,3}[a-zA-Z]{2,4}');
    const contentPattern = new RegExp(/(.)*/, 'g');

    const authorMatched = (author.match(authorPattern) || []).join('');
    const titleMatched = (title.match(contentPattern) || []).join('');
    const textMatched = (text.match(contentPattern) || []).join('');

    if((authorMatched.length < author.length) && (titleMatched.length < title.length) && (textMatched.length < text.length)) {
      throw new Error('Wrong characters used!');
    }
    if(title.length < 10) {
      throw new Error('Too short title (min. 10 characters)');
    }
    if(text.length < 20) {
      throw new Error('Too short text (min. 20 characters)');
    }

    if((authorMatched.length === author.length) && (titleMatched.length === title.length) && (textMatched.length === text.length)) {

      let newNameFile = null;
      let fileNameExt = null;

      if(req.file !== undefined) {
        newNameFile = req.file.filename;
        const filePath = req.file.path;
        fileNameExt = filePath.split('.').slice(-1)[0];
        if((fileNameExt !== 'jpg') && (fileNameExt !== 'png') && (fileNameExt !== 'gif')) {
          throw new Error('Wrong format file');
        }
      }
      console.log('newNameFile',newNameFile);
      console.log('fileNameExt',fileNameExt);

      const newPost = new Post({ title, text, author, created, updated, status, photo: newNameFile, price, phone, location});
      await newPost.save();
      console.log('newPost', newPost);
      res.json(newPost);

    } else {
      throw new Error('Wrong input!');
    }
  }
  catch(err) {
    res.status(500).json(err);
    console.error(err);
  }
});

router.put(`/posts/:id/edit`, upload.single('file'), async (req, res) => {
  try {
    const { title, text, author, created, updated, status, photo, price, phone, location} = req.body;

    console.log('req.body', req.body);

    const authorPattern = new RegExp('^[a-zA-Z0-9][a-zA-Z0-9_.-]+@[a-zA-Z0-9][a-zA-Z0-9_.-]+\.{1,3}[a-zA-Z]{2,4}');
    const contentPattern = new RegExp(/(.)*/, 'g');

    const authorMatched = (author.match(authorPattern) || []).join('');
    const titleMatched = (title.match(contentPattern) || []).join('');
    const textMatched = (text.match(contentPattern) || []).join('');

    if((authorMatched.length < author.length) && (titleMatched.length < title.length) && (textMatched.length < text.length)) {
      throw new Error('Wrong characters used!');
    }
    if(title.length < 10) {
      throw new Error('Too short title (min. 10 characters)');
    }
    if(text.length < 20) {
      throw new Error('Too short text (min. 20 characters)');
    }
    // console.log('test1');

    if((authorMatched.length == author.length) && (titleMatched.length == title.length) && (textMatched.length == text.length)) {

      let newNameFile = req.body.photo;
      let fileNameExt;

      if(req.file !== undefined) {
        newNameFile = req.file.filename;
        const filePath = req.file.path;
        console.log('filePath',filePath);
        fileNameExt = filePath.split('.').slice(-1)[0];
        if((fileNameExt !== 'jpg') && (fileNameExt !== 'png') && (fileNameExt !== 'gif') && (fileNameExt !== 'jpeg')) {
          throw new Error('Wrong format file');
        }
      }

      const editedPost = await (Post.findById(req.params.id));
      console.log('editedPost',editedPost);
      if(editedPost) {
        const changedPost = await (Post.updateOne({ _id: req.params.id }, { $set: { title, text, author, status, updated, photo: newNameFile, price, phone, location } }));
        res.json(changedPost);
      }
      else {
        throw new Error('Something wrong!');
      }
    }
    else {
      throw new Error('Wrong input!');
    }
  }
  catch(err) {
    res.status(500).json(err);
    console.error(err);
  }
});

module.exports = router;
