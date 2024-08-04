const Post = require('../models/post');
const User = require('../models/user');

// Create Post Controller
const createPostController = async (req, res, next) => {
    // console.log(req.body)
    const { caption, tags, location, } = req.body;
    const userId = req.user.id
    // console.log(userId)

    // Check if file is uploaded
    if (!req.file) {
        return next(createError(400, 'No file uploaded.'));
    }

    try {
        // Retrieve the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Log to check if file is being received
        // console.log("from post create controller ", caption, req.file);

        // Validate input
        if (!caption || !req.file) {
            return res.status(400).json({ message: 'Caption and image are required.' });
        }

        // Create a new post
        const newPost = new Post({
            caption,
            image: req.file.path,
            tags,
            location,
            user: userId,
        });

        // Save the post to the database
        const savedPost = await newPost.save();
        // console.log("saved post ", savedPost);

        // Update the user's posts array
        user.posts.push(savedPost._id);
        await user.save();

        // Respond with the created post
        res.status(201).json({
            message: 'Post created successfully',
            post: savedPost,
        });
    } catch (error) {
        // Handle errors
        console.error('Error creating post:', error);
        res.status(500).json({
            message: 'Error creating post',
            error: error.message,
        });
    }
};

const allPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().populate('user'); // Assuming user field in Post schema references User model
        // console.log(posts)
        res.status(200).json({
            message: "All posts retrieved successfully",
            user: req.user,
            posts: posts,
        });
    } catch (error) {
        console.error('Error retrieving posts:', error);
        res.status(500).json({
            message: 'Error retrieving posts',
            error: error.message,
        });
    }
};


module.exports = { createPostController, allPosts };
