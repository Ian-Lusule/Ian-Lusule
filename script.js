function toggleTheme() {
    document.body.classList.toggle('light');
    const icon = document.querySelector('.theme-toggle i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
}

async function fetchPinnedRepos() {
    try {
        const response = await fetch('https://api.kremilly.com/github?user=Ian-Lusule');
        const data = await response.json();

        if (!data || Object.keys(data).length === 0) {
            throw new Error('No pinned repositories found or API error');
        }

        const reposContainer = document.getElementById("repos");
        data.forEach(repo => {
            const div = document.createElement("div");
            div.className = "repo";
            div.innerHTML = `
                <h4>${repo.name}</h4>
                <p>${repo.description || "No description available."}</p>
                <a href="${repo.url}" target="_blank">🔗 View Repo</a>
            `;
            reposContainer.appendChild(div);
        });
    } catch (error) {
        console.error('Error fetching pinned repos:', error);
        const reposContainer = document.getElementById("repos");
        reposContainer.innerHTML = `<p>Error loading repositories. Please try again later.</p>`;
    }
}

fetchPinnedRepos();
