const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const jwt = require('jsonwebtoken')
const morgan = require('morgan')
const port = process.env.PORT || 8000

// middleware
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token
  console.log(token)
  if (!token) {
    return res.status(401).send({ message: 'unauthorized access' })
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(401).send({ message: 'unauthorized access' })
    }
    req.user = decoded
    next()
  })
}
const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_pass}@cluster0.dqsrrse.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})
async function run() {

  const BlogDB = client.db("BlogDB").collection("UsersDB");
  const UsersDB = client.db("BlogDB").collection("UsersDB");
  const AllBlogs = client.db("AllBlogsDB").collection("AllBlogs");

  try {
    // auth related api
    app.post('/jwt', async (req, res) => {
      const user = req.body
      console.log('I need a new jwt', user)
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '365d',
      })
      res
        .cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        .send({ success: true })
    })

    // Logout
    app.get('/logout', async (req, res) => {
      try {
        res
          .clearCookie('token', {
            maxAge: 0,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
          })
          .send({ success: true })
        console.log('Logout successful')
      } catch (err) {
        res.status(500).send(err)
      }
    })

    // Save or modify user email, status in DB


    app.post('/users/:email', async (req, res) => {
      const email = req.params.email
      const user = req.body
      const query = { email: email }
      const isExist = await UsersDB.findOne(query)
      if (isExist) return res.send(isExist)
      const result = await UsersDB.insertOne(user)
      res.send(result)
    })




    // ...........................blogs related...........................................

    app.post('/addBlog', async (req, res) => {
      const blog = req.body
      const result = await AllBlogs.insertOne(blog)
      res.send(result)
    })

    app.get('/allblogs', async (req, res) => {
      const result = await AllBlogs.find().toArray()
      res.send(result)

    })

    app.get('/recentblogs', async (req, res) => {
      const result = await AllBlogs.find().sort({ dateTime: -1 }).limit(3).toArray();
      res.send(result);

    });//get 3 recent blogs





app.put('/updatevotes/:id', async (req, res) => {
  try {
    const { upvotes, downvotes } = req.body;
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const existingBlog = await AllBlogs.findOne(query);

    if (!existingBlog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

 
      existingBlog.upvotes = upvotes;
      existingBlog.downvotes = downvotes;

    await AllBlogs.updateOne(query,
 { $set: { upvotes: existingBlog.upvotes, downvotes: existingBlog.downvotes } });

    return res.json({ success: true, message: 'Votes updated successfully' });
  } catch (error) {
    console.error('Error updating votes:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  } 
});


    // .......................................................

    await client.db('admin').command({ ping: 1 })
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    )
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('connected..')
})

app.listen(port, () => {
  console.log(`StayVista is running on port ${port}`)
})
