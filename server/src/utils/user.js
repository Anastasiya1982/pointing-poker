let users = [];
let master;

const userJoin = (userData) => {
  if (userData.isScrumMaster === true) {
    master = userData;
  }
  users.push(userData);
  return users;
};
const userLeave = (id) => users = users.filter(user => user.id !== id);

const setUserVoite = (data) => {
  // eslint-disable-next-line no-shadow
  const user = users.find(user => user.id === data.userId);
  user.voite = data.value;
  return users;
};
const getUsers = () => users;

const getMaster = () => master;

const getUsersVoiteArray = () => {
  const newArrResults = users.map(a => a.voite);
  return newArrResults;
};


module.exports= {
  userJoin,
  userLeave,
  getUsers,
  getMaster,
  setUserVoite,
  getUsersVoiteArray
}
