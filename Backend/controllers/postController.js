const Post = require('../models/post');
const User = require('../models/user');

// Create Post Controller
const createPostController = async (req, res) => {
    const { caption, tags, location } = req.body;
    const userId = req.user.id; // Assumes user ID is available from authentication middleware
    // console.log("from post create controller ", caption, tags , userId, location,  req.file)
    console.log(req.body)
    res.json({message : "chal gya raoute "})
    // try {
    //     // Retrieve the user
    //     const user = await User.findById(userId);
    //     if (!user) {
    //         return res.status(404).json({ message: 'User not found.' });
    //     }

    //     // Log to check if file is being received
    //     console.log("from post create controller ", caption, req.file);

    //     // Validate input
    //     if (!caption || !req.file) {
    //         return res.status(400).json({ message: 'Caption and image are required.' });
    //     }

    //     // Create a new post
    //     const newPost = new Post({
    //         caption,
    //         image: req.file.path,
    //         tags,
    //         location,
    //         user: userId,
    //     });

    //     // Save the post to the database
    //     const savedPost = await newPost.save();
    //     console.log("saved post ", savedPost);

    //     // Update the user's posts array
    //     user.posts.push(savedPost._id);
    //     await user.save();

    //     // Respond with the created post
    //     res.status(201).json({
    //         message: 'Post created successfully',
    //         post: savedPost,
    //     });
    // } catch (error) {
    //     // Handle errors
    //     console.error('Error creating post:', error);
    //     res.status(500).json({
    //         message: 'Error creating post',
    //         error: error.message,
    //     });
    // }
};

module.exports = { createPostController };
