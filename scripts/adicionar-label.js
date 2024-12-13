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

    const issueBody = issue.body; // Conteúdo da descrição da issue

    // Verificar se o conteúdo da issue contém a palavra "Alta"
    if (issueBody && issueBody.includes("[Alta]")) {
        console.log(`A issue contém "Alta". Adicionando a label.`);
        
        // Adicionar a label "Alta" (substitua com o ID da label real)
        await octokit.issues.addLabels({
            owner,
            repo,
            issue_number,
            labels: ['Alta'] // Adicione o nome ou ID da label, dependendo da sua configuração
        });

        console.log(`Label 'Alta' adicionada à issue #${issue_number}.`);
    } else {
        console.log(`A issue não contém "Alta". Nenhuma label adicionada.`);
    }
}

updateIssueOnNewComment();