import Team from './models/team';
import User from './models/user';
import Happiness from './models/happiness';

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

  Happiness.count((err, count) => {
    if (count > 0) {
      return;
    }

    const happiness1 = new Happiness({
      individualhappiness: 3,
      teamhappiness: 4,
      teamid: '5bab12681991ef2274b2866f',
      cuid: 'cjmah9iu8000146gz0tbav7ki',
    });

    Happiness.create([happiness1], (error) => {
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
}
