  let  users = [];

  const userJoin = (userData) => {
  users.push(userData);
    console.log(users);
  return users;
};
  const userLeave = (id) => users = users.filter(user => user.id !== id);

  const getUsers = () => users;

module.exports={
  userJoin,
  userLeave,
  getUsers
};
