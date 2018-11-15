class UI {
    constructor() {
        this.profile = document.getElementById('profile');
        this.searchContainer = document.querySelector('.searchContainer');
    }

    // Display profile
    showProfile(user) {
        this.profile.innerHTML = `
            <div class="card card-body mb-3">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${user.avatar_url}" alt="" class="img-fluid mb-2">
                        <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">Профиль</a>
                    </div>
                    <div class="col-md-9">
                        <div class="user-info-header mb-3">
                            <span class="badge badge-primary">Публичных репозиториев: ${user.public_repos}</span>
                            <span class="badge badge-secondary">Публичных гистов: ${user.public_gists}</span>
                            <span class="badge badge-success">Подписчики: ${user.followers}</span>
                            <span class="badge badge-info">Подписки: ${user.following}</span>
                        </div>
                        <ul class="list-group">
                            <li class="list-group-item">Компания: ${user.company ? user.company : 'N/A'}</li>
                            <li class="list-group-item">Веб-сайт/Блог: ${user.blog ? user.blog : 'N/A'}</li>
                            <li class="list-group-item">Расположение: ${user.location ? user.location : 'N/A'}</li>
                            <li class="list-group-item">Зарегестрирован: ${user.created_at.slice(0,10)}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <h3 class="page-heading mb-3">Последние репозитории</h3>
            <div id="repos"></div>
        `
    };

    // Display repos
    showRepos(repos) {
        let output = '';

        repos.forEach(repo => {
            output += `
                <div class="card card-body mb-2">
                    <div class="row">
                        <div class="col-md-6">
                            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                        </div>
                        <div class="col-md-6">
                            <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
                            <span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span>
                            <span class="badge badge-success">Forks: ${repo.forks_count}</span>
                        </div>
                    </div>
                </div>
            `
        });

        document.getElementById('repos').innerHTML = output;
    }

    // Display alert message
    showAlert(message = '', className = 'alert alert-info') {
        // Clear any alert
        this.clearAlert();
        // Create template
        const alert = `<div class="${className}">${message}</div>`;
        
        this.searchContainer.insertAdjacentHTML('afterbegin', alert);

        // Hide alert 2s
        setTimeout(() => this.clearAlert(), 2000);
    }

    // Clear alert
    clearAlert() {
        const currentAlert = document.querySelector('.alert');

        if (currentAlert) {
            currentAlert.remove();
        }
    }

    clearProfile() {
        this.profile.innerHTML = '';
    }
}