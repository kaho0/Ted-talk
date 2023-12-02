// const tags = [
//   'Technology', 'Travel', 'Food', 'Fashion', 'Health', 'Science', 'Business',
//   'Sports', 'Music', 'Art', 'Movies', 'Books', 'Fitness', 'Lifestyle', 'Coding',
// ];

// const authorImages = [
//   'https://i.ibb.co/0tCk30X/erik-lucatero-d2-MSDuj-Jl2g-unsplash.jpg',
//   'https://i.ibb.co/2K57dxx/janko-ferlic-GWFff-QS5e-WU-unsplash.jpg',
//   'https://i.ibb.co/2F0Z3ht/joseph-gonzalez-i-Fg-Rcq-Hznqg-unsplash-1.jpg',
//   'https://i.ibb.co/5hyjCcD/maria-eduarda-glbf-I0leexg-unsplash-1.jpg',
//   'https://i.ibb.co/8g7N9qH/mathias-huysmans-U4-JDj-Ymjn1g-unsplash.jpg',
//   'https://i.ibb.co/Ws3kzxD/stefan-stefancik-QXev-Dflbl8-A-unsplash.jpg',
//   'https://i.ibb.co/Ny90SQv/tamara-bellis-e-DVQw-VMLMg-U-unsplash.jpg',
// ];

// const generateRandomAuthorName = () => {
//   const names = ['Alice Johnson', 'Bob Smith', 'Charlie Davis', 'David Wilson', 'Emma Taylor'];
//   return names[Math.floor(Math.random() * names.length)];
// };

// const generateRandomPostContent = () => {
//   const content = `
//     Welcome to this blog post where we explore the fascinating world of [TAG].
//     In this post, we will delve into various aspects of [TAG], sharing insights and observations.
//     [TAG] has a unique charm that captivates enthusiasts, and we aim to showcase that in our discussion.

//     Our journey begins with an exploration of the latest trends and developments in [TAG].
//     We'll navigate through the challenges, opportunities, and exciting discoveries that define [TAG].

//     As we continue our exploration, you'll gain a deeper understanding of [TAG] from different perspectives.
//     Join us on this adventure, and let's unravel the mysteries and wonders of [TAG].

//     Thank you for joining us on this [TAG] journey. Stay tuned for more exciting updates!
//   `;

//   return content.replace(/\[TAG\]/g, 'Lorem Ipsum');
// };

// const generatePosts = () => {
//   const posts = [];
//   let postId = 1;

//   tags.forEach(tag => {
//     for (let i = 0; i < 3; i++) {
//       const post = {
//         id: postId++,
//         author: {
//           name: generateRandomAuthorName(),
//           image: authorImages[Math.floor(Math.random() * authorImages.length)],
//         },
//         title: `Post Title ${postId}: A Deep Dive into ${tag}`,
//         tag: tag,
//         description: generateRandomPostContent(),
//         time: new Date().toISOString().replace(/[-:]/g, '').slice(0, 12),
//       };

//       posts.push(post);
//     }
//   });

//   return posts;
// };

// const posts = generatePosts();
// console.log(JSON.stringify(posts, null, 2));
// export default posts