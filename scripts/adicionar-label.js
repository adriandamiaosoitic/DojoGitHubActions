const { Octokit } = require("@octokit/rest");

// Create an Octokit instance with authentication
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Main function to update issue on new comment
async function updateIssueOnNewComment() {
    const payload = require(process.env.GITHUB_EVENT_PATH);

    const owner = payload.repository.owner.login;
    const repo = payload.repository.name;
    const issue_number = payload.issue.number;

    // Obter o conteúdo da issue (descrição)
    const { data: issue } = await octokit.issues.get({
        owner,
        repo,
        issue_number
    });

    const issueBody = issue.body; 
    
    let labelAIncluir = '';
    if (issueBody && issueBody.includes("[Alta]")) {
        labelAIncluir = "Alta";
    } else if (issueBody && issueBody.includes("[Media]")) {
        labelAIncluir = "Media";
    } else if (issueBody && issueBody.includes("[Baixa]")) {
        labelAIncluir = "Baixa";
    }

    console.log("\x1b[32mLabel Inserida:\x1b[0m", labelAIncluir);
    
    await octokit.issues.addLabels({
        owner,
        repo,
        issue_number,
        labels: [labelAIncluir]
    });
}

updateIssueOnNewComment();