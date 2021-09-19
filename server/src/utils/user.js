  let  users = [];
  let muster;

  const userJoin = (userData) => {
  users.push(userData);
  return users;
};
  const userLeave = (id) => users = users.filter(user => user.id !== id);

  const getUsers = () => users;

  const getScrumMaster = () =>muster;

module.exports={
  userJoin,
  userLeave,
  getUsers
};
