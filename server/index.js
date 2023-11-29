const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const jwt = require('jsonwebtoken')
const morgan = require('morgan')
const stripe = require("stripe")(process.env.Payment_Key)
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
  const paymentDB = client.db("AllBlogsDB").collection("goldusers");

  try {
    // auth related api................................................................
    app.post('/jwt', async (req, res) => {
      const user = req.body
      const token = jwt.sign(user, process.env.Access_Token, { expiresIn: '3h' })
      console.log(token)
      res.cookie('token', token, {
        httpOnly: true,
        secure: false,

      })
      res.send({ success: true })

    })

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
    //.........................................................................................................



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

    app.get('/user', async (req, res) => {
      const email = req.query.email
      const query = { email: email }
      const result = await UsersDB.findOne(query)
      res.send(result)

    })



    // ...........................blogs related...........................................

    app.post('/addBlog', async (req, res) => {
      const blog = req.body
      const result = await AllBlogs.insertOne(blog)
      res.send(result)
    })
    app.get('/userposts', async (req, res) => {
      const email = req.query.email
      const query = { email: email }
      const projection = { totalposts: 1, badge: 1 }
      const result = await UsersDB.findOne(query, { projection: { totalposts: 1, badge: 1 } });
      console.log(result)
      res.send(result)

    })


    app.get('/allblogs', async (req, res) => {
      const result = await AllBlogs.find().toArray()
      res.send(result)

    })

    app.get('/blogs', async (req, res) => {
      const email = req.query.email
      console.log(email)
      const query = { email: email }
      console.log(query)
      const result = await AllBlogs.find(query).toArray()
      res.send(result)

    })


    app.get('/recentblogs', async (req, res) => {
      const result = await AllBlogs.find().sort({ dateTime: -1 }).limit(3).toArray();
      res.send(result);

    });//get 3 recent blogs

    app.delete('/delete/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) };
      const result = await AllBlogs.deleteOne(query)
      res.send(result);

    });



    app.put('/updatevotes/:id', async (req, res) => {
      try {
        const { upvoted, downvoted } = req.body;
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const existingBlog = await AllBlogs.findOne(query);

        if (!existingBlog) {
          return res.status(404).json({ success: false, message: 'Blog not found' });
        }



        const result = await AllBlogs.updateOne(
          query,
          {
            $inc: {
              upvotes: upvoted ? 1 : 0,
              downvotes: downvoted ? 1 : 0,
            },
          }
        );


        res.send(result);
      } catch (error) {
        console.error('Error updating votes:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }
    });

    app.put('updatevisivility/:id', async (req, res) => {
      const option = req.body
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          visivility: option
        },

      };
      const result = await UsersDB.updateOne(query, updateDoc);
      res.send(result)

    })

    app.put('/addcomment/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const commentmade = req.body;
        console.log(commentmade)
        const query = { _id: new ObjectId(id) };

        const result = await AllBlogs.updateOne(query, { $push: { comments: commentmade } });
        console.log(result)
        if (result.modifiedCount === 0) {
          return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        return res.json({ success: true, message: 'Comment added successfully' });
      } catch (error) {
        console.error('Error adding comment:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }
    });

    app.put('/updatebadge/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const updateDoc = {
        $set: {
          badge: 'Gold'
        },

      };
      const result = await UsersDB.updateOne(query, updateDoc);
      res.send(result)

    })


    app.put('/updatepostcounter', async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const updateDoc = {
        $inc: {
          totalposts: 1,
        },

      };
      const result = await UsersDB.updateOne(query, updateDoc);
      console.log(result)
      res.send(result)

    })




    // .......................................................

    //................payment related//////////

    app.post("/create-payment-intent", async (req, res) => {
      const { price } = req.body;
      const paymentIntent = await stripe.paymentIntents.create({
        amount: parseInt(price * 100),
        currency: "usd",
        payment_method_types: ['card']
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    app.post('/payments', async (req, res) => {
      const payment = req.body;
      const paymentResult = await paymentDB.insertOne(payment);
      res.send({ paymentResult });
    })




    //.......................................................................
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
