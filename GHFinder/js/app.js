// Init Github
const github = new Github();

// Init UI
const ui = new UI();

// Init search input
const searchInput = document.getElementById('serchUser');

// Add Event Listiner
searchInput.addEventListener('keyup', (e) => {
    // Get input text
    const userText = e.target.value;

    if (userText !== '') {
        // Make http request
        github.getUser(userText)
            .then(user => {
                if (user.message === 'Not Found') {
                    // Show alert
                    ui.showAlert(`User: ${userText} not found`, 'alert alert-danger');
                    ui.clearProfile();
                } else {
                    // Show Profile
                    ui.showProfile(user);
                    ui.clearAlert();
                }
                return user
            })
            .then(user => github.getRepos(user))
            .then(repos => ui.showRepos(repos))
            .catch(err => console.log(err));
    } else {
        // Clear profile
        ui.clearProfile();
    }
});