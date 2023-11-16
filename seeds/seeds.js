const { User, Comment, Post } = require('../models');

const seedData = async () => {
try {
// Create users
const user1 = await User.create({ username: "John", password: "123"});
const user2 = await User.create({ username: "Jane", password: "abc" });

// Create posts
const post1 = await Post.create({ title: "First Post", content: "Lorem ipsum dolor sit amet", userId: user1.id });
const post2 = await Post.create({ title: "Second Post", content: "Consectetur adipiscing elit", userId: user2.id });

// Create comments
const comment1 = await Comment.create({ content: "Great post!", postId: post1.id, userId: user2.id });
const comment2 = await Comment.create({ content: "I agree with you.", postId: post1.id, userId: user1.id });
const comment3 = await Comment.create({ content: "Nice job!", postId: post2.id, userId: user1.id });

console.log("Seed data created successfully");
} catch (error) {
console.error("Error creating seed data:", error);
}
};

seedData();