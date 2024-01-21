document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const searchTerm = searchInput.value.trim();
  
      if (searchTerm) {
        searchUsers(searchTerm);
      }
    });
  
    function searchUsers(username) {
      const userSearchEndpoint = `https://api.github.com/search/users?q=${username}`;
  
      fetch(userSearchEndpoint)
        .then(response => response.json())
        .then(data => {
          displayUsers(data.items);
        })
        .catch(error => console.error('Error fetching user data:', error));
    }
  
    function displayUsers(users) {
      userList.innerHTML = '';
  
      users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <img src='${user.avatar_url}' alt='${user.login}' width='50' height='50'>
          <a href='${user.html_url}' target='_blank'>${user.login}</a>
        `;
        listItem.addEventListener('click', function () {
          getUserRepos(user.login);
        });
        userList.appendChild(listItem);
      });
    }
  
    function getUserRepos(username) {
      const userReposEndpoint = `https://api.github.com/users/${username}/repos`;
  
      fetch(userReposEndpoint)
        .then(response => response.json())
        .then(data => {
          displayRepos(data);
        })
        .catch(error => console.error('Error fetching user repos:', error));
    }
  
    function displayRepos(repos) {
      reposList.innerHTML = '';
  
      if (repos.length === 0) {
        const noReposItem = document.createElement('li');
        noReposItem.textContent = 'This user has no public repositories.';
        reposList.appendChild(noReposItem);
      } else {
        repos.forEach(repo => {
          const listItem = document.createElement('li');
          listItem.textContent = repo.name;
          reposList.appendChild(listItem);
        });
      }
    }
  });
  