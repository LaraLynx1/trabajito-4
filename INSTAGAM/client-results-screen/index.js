const API_URL = 'http://localhost:5050';

async function fetchUsersAndPosts() {
  try {
    const [usersResponse, postsResponse] = await Promise.all([
      fetch(`${API_URL}/users`),
      fetch(`${API_URL}/posts`)
    ]);

    if (!usersResponse.ok || !postsResponse.ok) {
      throw new Error('Error al obtener los datos');
    }

    const users = await usersResponse.json();
    const posts = await postsResponse.json();

    const usersList = document.getElementById('users-list');
    usersList.innerHTML = ''; // Limpiar lista antes de agregar nuevos elementos
    users.forEach(user => {
      const li = document.createElement('li');
      li.textContent = `${user.name} (${user.username})`;
      usersList.appendChild(li);
    });

    const postsList = document.getElementById('posts-list');
    postsList.innerHTML = ''; // Limpiar lista antes de agregar nuevos elementos
    posts.forEach(post => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${post.title}</strong> por ${post.username}<br>${post.content}`;
      postsList.appendChild(li);
    });
  } catch (error) {
    console.error('Error al obtener usuarios y posts:', error);
    // Mostrar mensaje de error al usuario
    const usersList = document.getElementById('users-list');
    const postsList = document.getElementById('posts-list');
    usersList.innerHTML = '<li>Error al cargar usuarios</li>';
    postsList.innerHTML = '<li>Error al cargar publicaciones</li>';
  }
}

document.addEventListener('DOMContentLoaded', fetchUsersAndPosts);
