let  issues = [];
const issueJoin = (issue) => {

  issues.push(issue);
  return issues;
};
const getIssues = () =>issues;

const deleteIssue=(title)=>{
 issues=issues.filter(iss=>iss.title !== title)
}


module.exports={
  issueJoin,
  getIssues,
  deleteIssue
};
