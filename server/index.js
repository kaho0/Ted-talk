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
  origin:'https://tagtalk-5e7ed.web.app',
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
  const noticeDB = client.db("AllBlogsDB").collection("notice");
  try {
    // auth related api................................................................
    app.post('/jwt', async (req, res) => {
      const user = req.body
      const token = jwt.sign(user, process.env.Access_Token, { expiresIn: '3h' })
      res.cookie('token', token, {
        httpOnly: true,
        secure: false,

      })
      res.send({ success: true })

    })

    const verifyToken = async (req, res, next) => {
      const token = req.cookies?.token
      console.log('token', token)
      if (!token) {
        return res.status(401).send({ message: 'unauthorized access' })
      }
      jwt.verify(token, process.env.Access_Token, (err, decoded) => {
        if (err) {
          console.log(err)
          return res.status(401).send({ message: 'unauthorized access' })
        }
        req.user = decoded
        next()
      })
    }

    const verifyAdmin = async (req, res, next) => {

      const email = req.user?.email;
      const query = { email: email };

      const user = await UsersDB.findOne(query);
      const isAdmin = user?.role === 'admin';
      if (!isAdmin) {
        return res.status(403).send({ message: 'forbidden access' });
      }
      next();
    }

    app.get('/admin/:email', verifyToken, async (req, res) => {
      const email = req.params.email;
      if (email !== req.user.email) {
        return res.status(403).send({ message: 'forbidden access' })
      }

      const query = { email: email };
      const user = await UsersDB.findOne(query);
      let admin = false;
      if (user) {
        admin = user?.role === 'admin';
      }
      res.send({ admin });
    })






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

    app.post('/addBlog',verifyToken, async (req, res) => {
      const blog = req.body
      const result = await AllBlogs.insertOne(blog)
      res.send(result)
    })
    app.get('/userposts',verifyToken, async (req, res) => {
      const email = req.query.email
      const query = { email: email }
      const projection = { totalposts: 1, badge: 1 }
      const result = await UsersDB.findOne(query, { projection: { totalposts: 1, badge: 1 } });
      res.send(result)

    })


    app.get('/allblogs', async (req, res) => {
      const result = await AllBlogs.find().toArray()
      res.send(result)

    })

    app.get('/blogs',verifyToken, async (req, res) => {
      const email = req.query.email
      const query = { email: email }
      const result = await AllBlogs.find(query).toArray()
      res.send(result)

    })

    // get popular posts
    app.get('/popularposts', async (req, res) => {
      try {
        const popularPosts = await AllBlogs.aggregate([
          {
            $addFields: {
              voteDifference: {
                $subtract: ["$upvotes", "$downvotes"],
              },
            },
          },
          {
            $sort: {
              voteDifference: -1,
            },
          },
          {
            $limit: 3,
          },
        ]).toArray();

        res.send(popularPosts);
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    });



    app.get('/recentblogs', async (req, res) => {
      const result = await AllBlogs.find().sort({ dateTime: -1 }).limit(3).toArray();
      res.send(result);

    });//get 3 recent blogs

    app.delete('/delete/:id',verifyToken, async (req, res) => {
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

    app.put('updatevisivility/:id',verifyToken, async (req, res) => {
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

    app.put('/addcomment/:id', verifyToken,async (req, res) => {
      try {
        const id = req.params.id;
        const commentmade = req.body;
        const query = { _id: new ObjectId(id) };

        const result = await AllBlogs.updateOne(query, { $push: { comments: commentmade } });
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
      res.send(result)

    })

    //////////////////////////////admin///////////////////////////////

    app.post('/notice',verifyToken,verifyAdmin, async (req, res) => {
      const notice = req.body
      const result = await noticeDB.insertOne(notice)
      res.send(result)
    })


    app.get('/getnotice', async (req, res) => {
      const result = await noticeDB.find().toArray()
      res.send(result)

    })

    app.get('/allusers',verifyToken,verifyAdmin, async (req, res) => {
      const result = await UsersDB.find().toArray()
      res.send(result)

    })

    app.get('/total', async (req, res) => {

      const result = await AllBlogs.aggregate([
        {
          $project: {
            _id: 0,
            blogId: "$_id",
            upvotes: "$upvotes",
            downvotes: "$downvotes"
          }
        },
        {
          $group: {
            _id: null,
            totalUpvotes: { $sum: "$upvotes" },
            totalDownvotes: { $sum: "$downvotes" }
          }
        }
      ]);
      res.send(result)

    })






    app.delete('/deleteuser',verifyToken,verifyAdmin, async (req, res) => {
      const id = req.query.id
      const query = { _id: new ObjectId(id) }
      const rest = await UsersDB.deleteOne(query)
      res.send(rest)
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
    // await client.db('admin').command({ ping: 1 })

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
  console.log(`Tagtalk is running on port ${port}`)
})
