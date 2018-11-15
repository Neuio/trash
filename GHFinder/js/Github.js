class Github {
    constructor() {
        this.client_id = '5c27da6d7ba2f0afef95';
        this.client_secret = '9ae7ed4b3347bdba03371a21dac14a82a867f35a';
    }

    // Get user by name
    getUser(name) {
        return new Promise((resolve, reject) => {
            fetch(`https://api.github.com/users/${name}?client_id=${this.client_id}&client_secret=${this.client_secret}`)
                .then(res => res.json())
                .then(user => resolve(user))
                .catch(err => reject(err));
        })
    };

    // Get repos by name
    getRepos(user) {
        return new Promise((resolve, reject) => {
            if (!user.login) reject('User not found');

            fetch(`https://api.github.com/users/${user.login}/repos?per_page=${5}&sort=${'created: asc'}&client_id=${this.client_id}&client_secret=${this.client_secret}`)
                .then(res => res.json())
                .then(user => resolve(user))
                .catch(err => reject(err));
        })
    };
}