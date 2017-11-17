import Post from "./models/post";
import Comment from "./models/comment";

export default function() {
  Post.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const content1 = `Sed ut perspiciatis unde omnis iste natus error
      sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
      eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae
      vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
      aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
      qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
      ipsum quia dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
      ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
      in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum`;

    const content2 = `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
      ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
      in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum. Sed ut perspiciatis unde omnis iste natus error
      sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
      eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae
      vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
      aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
      qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
      ipsum quia dolor sit amet.`;

    const commentBody = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod ea nam laboriosam nemo porro, perferendis,
       et ex non expedita consequuntur sint reiciendis est ipsum libero recusandae. Architecto, nisi facilis? Corporis?`;

    const post1 = new Post({
      name: "Admin",
      title: "Hello MERN",
      slug: "hello-mern",
      cuid: "cikqgkv4q01ck7453ualdn3hd",
      content: content1
    });
    const post2 = new Post({
      name: "Admin",
      title: "Lorem Ipsum",
      slug: "lorem-ipsum",
      cuid: "cikqgkv4q01ck7453ualdn3hf",
      content: content2
    });

    const comment1 = new Comment({
      author: "Mr. 1",
      body: commentBody,
      owner: post1,
      cuid: "gadkgjfdalkgjdflkgjhdfjgkh324234"
    });
    const comment2 = new Comment({
      author: "Mr. Two",
      body: commentBody,
      owner: post1,
      cuid: "gadkgjfdalkgjdflkgjhdfsdf6534"
    });
    const comment3 = new Comment({
      author: "Mr. 3(threeee)",
      body: commentBody,
      owner: post1,
      cuid: "gadkgjfsdsfdfsddalsdfsdfvbkgjhdfsdf6534"
    });

    Post.create([post1, post2], error => {
      if (!error) {
        console.log("Successfully created 2 posts");
      }
      Comment.create([comment1, comment2, comment3], commentError => {
        if (!commentError) {
          console.log("Successfully created 3 comments");
        }
      });
    });
  });
}
