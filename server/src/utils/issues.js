let  issues = [];
let activeIssue;
const issueJoin = (issue) => {
  issues.push(issue);
  return issues;
};
const getIssues = () =>issues;

const deleteIssue=(title)=>{
 issues=issues.filter(iss=>iss.title !== title)
}
const findActiveIssue=(issue)=>{
  activeIssue=issue;
  return activeIssue
};

const setResultsToIssue=(arr)=>{
  const currentIssue=issues.find(iss=>iss.title===activeIssue.title);
  currentIssue.results=arr;
  return issues;
}
const getActiveIssue=()=>activeIssue;

module.exports={
  issueJoin,
  getIssues,
  deleteIssue,
  findActiveIssue,
  getActiveIssue,
  setResultsToIssue
};
