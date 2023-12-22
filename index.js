import readlineSync from 'readline-sync';

const gameRules = {
  paper: {
    rock: 'user',
    scissors: 'computer',
  },
  rock: {
    paper: 'computer',
    scissors: 'user',
  },
  scissors: {
    paper: 'user',
    rock: 'computer',
  },
};

const options = Object.keys(gameRules);

const symbols = ['//', '()', '8<'];

const chooseRandomEl = (arr) => arr[Math.trunc(Math.random() * arr.length)];

const chooseWinner = (mv1, mv2) => gameRules[mv1][mv2] ?? 'nobody';

const getMessage = (winner, mv1, mv2) => {
  switch (winner) {
    case 'user':
      return `You won! ${mv1} breaks ${mv2}`;
    case 'computer':
      return `You lose(( ${mv1} broken by ${mv2}`;
    default:
      return 'Draw...';
  }
};

const gameRun = () => {
  let score = null;
  if (readlineSync.keyInYN('Keeping score?\n')) {
    score = {
      user: 0,
      computer: 0,
    };
  }

  do {
    console.log('Paper, rock, scissors, shoot!\n');
    console.log('Choose wisely:\n');
    options.forEach((option, i) => {
      console.log(`${option} ${symbols[i]}`);
    });

    const userMv = readlineSync.question(
      '\nYour choice is ',
      {
        limit: options,
        limitMessage: 'I don\'t get it. Let\'s try again',
      },
    ).trim().toLowerCase();

    const computerMv = chooseRandomEl(options);
    console.log(`Computer choice is ${computerMv}\n`);
    const winner = chooseWinner(userMv, computerMv);
    console.log(getMessage(winner, userMv, computerMv));

    if (score) {
      score[winner] += 1;
      console.log(`\nScore: user - ${score.user}, computer - ${score.computer}`);
    }
  } while (readlineSync.keyInYN('\nWould you like to try again?'));

  console.log('\nThank you for playing! Bye');
};

gameRun();
