// const express = require('express');
// const router = express.Router();

// const Post = require('../models/post.model');
// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, '../uploads'));
//   },
//   filename: function (req, file, cb) {
//     const nameImage = Date.now() + '-bulletin-board-' + file.originalname;
//     cb(null, nameImage);
//   },
// });
// let upload = multer({ storage });

// router.get('/posts', async (req, res) => {
//   try {
//     const result = await Post
//       .find({status: 'published'})
//       .select('author created title photo')
//       .sort({created: -1});
//     if(!result) res.status(404).json({ post: 'Not found' });
//     else res.json(result.map(post => {
//       console.log('post', post);
//       return {
//         photo: `http://localhost:8000/${post.photo}`,
//         _id: post.id,
//         created: post.created,
//         title: post.title,
//         author: post.author,
//       };
//     }));
//   }
//   catch(err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/posts/:id', async (req, res) => {
//   try {
//     const result = await Post
//       .findById(req.params.id);
//     if(!result) res.status(404).json({ post: 'Not found' });
//     else res.json({
//       ...result,
//       photo: `http://localhost:8000/${result.photo}`,
//     });

//   }
//   catch(err) {
//     res.status(500).json(err);
//     console.error(err);
//   }
// });

// router.post('/posts/add', upload.single('file'), async (req, res) => {
//   try {

//     const { title, text, author, created, updated, status, photo, price, phone, location} = req.body;

//     console.log('req.body', req.body);

//     const authorPattern = new RegExp('^[a-zA-Z0-9][a-zA-Z0-9_.-]+@[a-zA-Z0-9][a-zA-Z0-9_.-]+\.{1,3}[a-zA-Z]{2,4}');
//     const contentPattern = new RegExp(/(.)*/, 'g');

//     const authorMatched = (author.match(authorPattern) || []).join('');
//     const titleMatched = (title.match(contentPattern) || []).join('');
//     const textMatched = (text.match(contentPattern) || []).join('');

//     if((authorMatched.length < author.length) && (titleMatched.length < title.length) && (textMatched.length < text.length)) {
//       throw new Error('Wrong characters used!');
//     }
//     if(title.length < 10) {
//       throw new Error('Too short title (min. 10 characters)');
//     }
//     if(text.length < 20) {
//       throw new Error('Too short text (min. 20 characters)');
//     }

//     if((authorMatched.length === author.length) && (titleMatched.length === title.length) && (textMatched.length === text.length)) {

//       let newNameFile = null;
//       let fileNameExt = null;

//       if(req.file !== undefined) {
//         newNameFile = req.file.filename;
//         const filePath = req.file.path;
//         fileNameExt = filePath.split('.').slice(-1)[0];
//         if((fileNameExt !== 'jpg') && (fileNameExt !== 'png') && (fileNameExt !== 'gif')) {
//           throw new Error('Wrong format file');
//         }
//       }
//       console.log('newNameFile',newNameFile);
//       console.log('fileNameExt',fileNameExt);

//       const newPost = new Post({ title, text, author, created, updated, status, photo: newNameFile, price, phone, location});
//       await newPost.save();
//       console.log('newPost', newPost);
//       res.json(newPost);

//     } else {
//       throw new Error('Wrong input!');
//     }
//   }
//   catch(err) {
//     res.status(500).json(err);
//     console.error(err);
//   }
// });

// router.put(`/posts/:id/edit`, upload.single('file'), async (req, res) => {
//   try {
//     const { title, text, author, created, updated, status, photo, price, phone, location} = req.body;

//     console.log('req.body', req.body);

//     const authorPattern = new RegExp('^[a-zA-Z0-9][a-zA-Z0-9_.-]+@[a-zA-Z0-9][a-zA-Z0-9_.-]+\.{1,3}[a-zA-Z]{2,4}');
//     const contentPattern = new RegExp(/(.)*/, 'g');

//     const authorMatched = (author.match(authorPattern) || []).join('');
//     const titleMatched = (title.match(contentPattern) || []).join('');
//     const textMatched = (text.match(contentPattern) || []).join('');

//     if((authorMatched.length < author.length) && (titleMatched.length < title.length) && (textMatched.length < text.length)) {
//       throw new Error('Wrong characters used!');
//     }
//     if(title.length < 10) {
//       throw new Error('Too short title (min. 10 characters)');
//     }
//     if(text.length < 20) {
//       throw new Error('Too short text (min. 20 characters)');
//     }
//     // console.log('test1');

//     if((authorMatched.length == author.length) && (titleMatched.length == title.length) && (textMatched.length == text.length)) {

//       let newNameFile = req.body.photo;
//       let fileNameExt;

//       if(req.file !== undefined) {
//         newNameFile = req.file.filename;
//         const filePath = req.file.path;
//         console.log('filePath',filePath);
//         fileNameExt = filePath.split('.').slice(-1)[0];
//         if((fileNameExt !== 'jpg') && (fileNameExt !== 'png') && (fileNameExt !== 'gif') && (fileNameExt !== 'jpeg')) {
//           throw new Error('Wrong format file');
//         }
//       }

//       const editedPost = await (Post.findById(req.params.id));
//       console.log('editedPost',editedPost);
//       if(editedPost) {
//         const changedPost = await (Post.updateOne({ _id: req.params.id }, { $set: { title, text, author, status, updated, photo: newNameFile, price, phone, location } }));
//         res.json(changedPost);
//       }
//       else {
//         throw new Error('Something wrong!');
//       }
//     }
//     else {
//       throw new Error('Wrong input!');
//     }
//   }
//   catch(err) {
//     res.status(500).json(err);
//     console.error(err);
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();

const Post = require('../models/post.model');

function escape(html) {
  return html
    .replace(/&/g, '')
    .replace(/</g, '')
    .replace(/>/g, '')
    .replace(/"/g, '')
    .replace(/'/g, '');
}
router.get('/posts', async (req, res) => {
  try {
    const result = await Post.find({ status: 'published' })
      .select('author created updated title photo')
      .sort({ created: -1 });
    if (!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/yourposts', async (req, res) => {
  try {
    const where = { status: 'published' };
    if (req.user) {
      where.author = req.user.emails[0].value;
    }

    const result = await Post.find(where)
      .select('author created updated title photo')
      .sort({ created: -1 });
    console.log(result);
    if (!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post.findById(req.params.id);
    if (!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post('/posts/add', async (req, res) => {
  try {
    const {
      author,
      created,
      updated,
      status,
      title,
      text,
      photo,
      price,
      phone,
      location,
    } = req.body;
    const pattern = new RegExp(
      /(<\s*(strong|em)*>(([A-z]|\s)*)<\s*\/\s*(strong|em)>)|(([A-z]|\s|\.)*)/,
      'g'
    );
    const titleMatched = (title.match(pattern) || []).join('');
    const textMatched = (author.match(pattern) || []).join('');
    const locationMatched = (location.match(pattern) || []).join('');
    const emailPattern = new RegExp(
      '^[a-zA-Z0-9][a-zA-Z0-9_.-]+@[a-zA-Z0-9][a-zA-Z0-9_.-]+.{1,3}[a-zA-Z]{2,4}'
    );
    const validatedEmail = emailPattern.test(author);
    const fileExt = photo.split('.').slice(-1)[0];
    const acceptedExt = ['gif', 'jpg', 'png', 'jpeg'];
    if (titleMatched.length < title.length)
      throw new Error('Invalid characters in the title...');

    if (location && locationMatched.length < location.length)
      throw new Error('Invalid characters in the location...');

    if (!validatedEmail) throw new Error('Wrong email!');

    if (text.length < 20 || title.length < 10)
      throw new Error('The text is too short');
    if (title && text && author && status) {
      const newPost = new Post({
        author: author,
        created: created,
        updated: updated,
        status: status,
        title: escape(title),
        text: escape(text),
        photo: photo,
        price: price,
        phone: phone,
        location: escape(location),
      });
      await newPost.save();
      res.json({ message: 'OK' });
    } else {
      throw new Error('Wrong input!');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/posts/:id/edit', async (req, res) => {
  try {
    const {
      author,
      created,
      updated,
      status,
      title,
      text,
      photo,
      price,
      phone,
      location,
    } = req.body;

    const emailPattern = new RegExp(
      '^[a-zA-Z0-9][a-zA-Z0-9_.-]+@[a-zA-Z0-9][a-zA-Z0-9_.-]+.{1,3}[a-zA-Z]{2,4}'
    );
    const validatedEmail = emailPattern.test(author);
    if (!validatedEmail) throw new Error('Wrong email!');
    if (text.length < 20 || title.length < 10)
      throw new Error('The text is too short');

    if (title && text && author && status) {
      const postToEdit = await Post.findById(req.params.id);
      if (postToEdit) {
        const changedPost = await Post.updateOne(
          { _id: req.params.id },
          {
            $set: {
              author: author,
              created: created,
              updated: updated,
              status: status,
              title: escape(title),
              text: escape(text),
              photo: photo,
              price: price,
              phone: phone,
              location: escape(location),
            },
          }
        );
        res.json(changedPost);
      } else {
        throw new Error('Wrong input!');
      }
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
