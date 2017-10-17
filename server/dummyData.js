import Post from './models/post';

export default function () {
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

    const comments = [
      {
        author: 'Steve',
        text: `Amazing stuff! Drawings me opinions returned absolute in.
              Otherwise therefore sex did are unfeeling something.
              Certain be ye amiable by exposed so. To celebrated estimating excellence do.
              Coming either suffer living her gay theirs.
              Furnished do otherwise daughters contented conveying attempted no.
              Was yet general visitor present hundred too brother fat arrival.
              Friend are day own either lively new.`
      },
      {
        author: 'Nancey',
        text: `Cool stuff! To celebrated estimating excellence do.
              Coming either suffer living her gay theirs.
              Furnished do otherwise daughters contented conveying attempted no.
              Was yet general visitor present hundred too brother fat arrival.
              Friend are day own either lively new. `
      },
      {
        author: 'Lucas',
        text: `Moments its musical age explain.
              But extremity sex now education concluded earnestly her continual.
              Oh furniture acuteness suspected continual ye something frankness.
              Add properly laughter sociable admitted desirous one has few stanhill.
              Opinion regular in perhaps another enjoyed no engaged he at.`
      },
    ];

    const post1 = new Post({ name: 'Admin',
                             title: 'Hello MERN',
                             slug: 'hello-mern',
                             cuid: 'cikqgkv4q01ck7453ualdn3hd',
                             content: content1,
                             comments: comments,
    });
    const post2 = new Post({ name: 'Admin',
                             title: 'Lorem Ipsum',
                             slug: 'lorem-ipsum',
                             cuid: 'cikqgkv4q01ck7453ualdn3hf',
                             content: content2,
                             comments: comments,
    });

    Post.create([post1, post2], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });
}
