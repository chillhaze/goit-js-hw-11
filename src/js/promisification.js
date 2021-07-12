// Task-1==========================
console.log('Task-1');
const delay = ms => {
  return new Promise(() => {
    setTimeout(() => {
      logger(ms);
      // console.log('успешный промис');
    }, ms);
  });
};

const logger = time => console.log(`Fulfilled after ${time}ms`);

// Tests
delay(2000).then(logger); // Fulfilled after 2000ms
delay(1000).then(logger); // Fulfilled after 1000ms
delay(1500).then(logger); // Fulfilled after 1500ms

// Task-2==========================
const users = [
  { name: 'Mango', active: true },
  { name: 'Poly', active: false },
  { name: 'Ajax', active: false },
];

// console.table(users);

const toggleUserState = (allUsers, username) => {
  return new Promise(() => {
    // Timeout added for better view in DevTools -> Console panel
    setTimeout(() => {
      console.log('Task-2');
      const updatedUsers = allUsers.map(user =>
        user.name === username ? { ...user, active: !user.active } : user,
      );

      console.table(updatedUsers);
    }, 2500);
  });
};

toggleUserState(users, 'Mango').then(console.table);
toggleUserState(users, 'Ajax').then(console.table);

// Task-3==========================
const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const makeTransaction = transaction => {
  const delay = randomIntegerFromInterval(200, 500);

  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log('Task-3');
      const canProcess = Math.random() > 0.3;

      if (canProcess) {
        res({ id: transaction.id, time: delay });
      } else {
        rej(transaction.id);
      }
    }, delay + 3000);
  });
};

const logSuccess = ({ id, time }) => {
  console.log(`Transaction ${id} processed in ${time}ms`);
};

const logError = id => {
  console.warn(`Error processing transaction ${id}. Please try again later.`);
};

makeTransaction({ id: 70, amount: 150 }).then(logSuccess).catch(logError);
makeTransaction({ id: 71, amount: 230 }).then(logSuccess).catch(logError);
