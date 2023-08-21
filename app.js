function getUsersData() {
    let usersData;
  
    if (localStorage.getItem('users')) {
      usersData = JSON.parse(localStorage.getItem('users'));
    } else {
      usersData = [];
    }
  
    return usersData;
  }
  
  // Save data to local storage
  function saveUsersData(usersData) {
    localStorage.setItem('users', JSON.stringify(usersData));
  }
  
  // Display users in the table
  function displayUsers() {
    const usersData = getUsersData();
    const tableBody=document.querySelector("#userTable tbody")
  
    // Clear table body
    tableBody.innerHTML = '';
  
    usersData.forEach((user, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.username}</td>
        <td>${user.userphone}</td>
        <td>${user.useremail}</td>
        <td class="actions">
          <button class="edit-btn" data-index="${index}">Edit</button>
          <button class="delete-btn" data-index="${index}">Delete</button>
        </td>
      `;
  
      tableBody.appendChild(row);
    });
  }
  
  // Add new user
  function addUser(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username').value;
    const userphone = document.querySelector('#userphone').value;
    
  
    const user = {
      username,
      userphone
      
    };
  
    const usersData = getUsersData();
    usersData.push(user);
    saveUsersData(usersData);
    displayUsers();
  
    // Clear form inputs
    document.querySelector('#userForm').reset();
  }
  
  // Edit user
  function editUser(event) {
    if (event.target.classList.contains('edit-btn')) {
      const index = event.target.dataset.index;
      const usersData = getUsersData();
      const user = usersData[index];
  
      // Set form inputs with user data
      document.querySelector('#username').value = user.username;
      document.querySelector('#userphone').value = user.userphone;
      document.querySelector('#useremail').value = user.useremail;
  
      // Remove the user from the array
      usersData.splice(index, 1);
      saveUsersData(usersData);
      displayUsers();
    }
  }
  
  // Delete user
  function deleteUser(event) {
    if (event.target.classList.contains('delete-btn')) {
      const index = event.target.dataset.index;
      const usersData = getUsersData();
  
      // Remove the user from the array
      usersData.splice(index, 1);
      saveUsersData(usersData);
      displayUsers();
    }
  }
  
  
  
  // Attach event listeners
  document.querySelector('#userForm').addEventListener('submit', addUser);
  document.querySelector('#userTable').addEventListener('click', editUser);
  document.querySelector('#userTable').addEventListener('click', deleteUser);
  
  // Initial display of users
  displayUsers();