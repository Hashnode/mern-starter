import Post from './models/post';
import Team from './models/team';
import User from './models/user';

export default function () {
  Team.count().exec((err, count) => {
    // console.log(`${count} Teams available.`);

    if (count > 0) {
      return;
    }

    const team1 = new Team({ name: 'Team 01', cuid: '1aec5410064b4986aebd3d2d9686b3e5' });
    const team2 = new Team({ name: 'Test Team 99', cuid: 'bb341c44a156493db62840aa5ff8ce5f' });
    const team3 = new Team({ name: 'Jims Favourites', cuid: 'adc104afee684c21b90d54160f8b7df3' });

    Team.create([team1, team2, team3], (error) => {
      if (!error) {
        // console.log('We have now some team test data :)');
      }
      if (error) {
        // console.log(error.toString());
      }
    });
  });

  User.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const user1 = new User({
      id: 'cjmah9iu8000146gz0tbav7ki',
      name: 'Rosman',
      phone: '0225902072',
      email: 'test@test.com',
      team: '5bab105c87082abdcbd71659'
    });
    const user2 = new User({
      id: 'cjmah9iu8000146gz0tbav7kj',
      name: 'Test',
      phone: '0',
      email: 'test1@test.com',
      team: '5bab105c87082abdcbd7165a'
    });

    User.create([user1, user2], (error) => {
      if (error) {
        console.log('user dummy data failed!' + error);
      } else {
        console.log('user dummy data added!');
      }
    });
  });

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

    const post1 = new Post({ name: 'Admin', title: 'Hello MERN', slug: 'hello-mern', cuid: 'cikqgkv4q01ck7453ualdn3hd', content: content1 });
    const post2 = new Post({ name: 'Admin', title: 'Lorem Ipsum', slug: 'lorem-ipsum', cuid: 'cikqgkv4q01ck7453ualdn3hf', content: content2 });

    Post.create([post1, post2], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });
}
