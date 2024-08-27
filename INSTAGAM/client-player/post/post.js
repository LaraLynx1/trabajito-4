document.addEventListener('DOMContentLoaded', function () {
  const formulario = document.getElementById('formularioPost');
  const postsContainer = document.getElementById('posts-container');

  function cargarPosts() {
      const posts = JSON.parse(localStorage.getItem('posts')) || [];
      postsContainer.innerHTML = '';

      posts.forEach((post, index) => {
          const postElement = document.createElement('div');
          postElement.classList.add('post');
          postElement.innerHTML = `
              <img src="${post.imagenData}" alt="Imagen del post" style="max-width: 200px; height: auto;">
              <h1>${post.titulo}</h1>
              <p>${post.descripcion}</p>
              <button onclick="deletePost(${index})">Eliminar</button>
          `;
          postsContainer.appendChild(postElement);
      });
  }

  cargarPosts();

  formulario.addEventListener('submit', function (event) {
      event.preventDefault();

      const titulo = document.getElementById('titulo').value;
      const descripcion = document.getElementById('descripcion').value;
      const imagenArchivo = document.getElementById('imagenArchivo').files[0];

      if (titulo.trim() === '' || descripcion.trim() === '') {
          alert('El título y la descripción son obligatorios.');
          return;
      }

      if (imagenArchivo) {
          const reader = new FileReader();
          reader.onload = function (e) {
              const imagenData = e.target.result;

              const postData = {
                  imagenData,
                  titulo,
                  descripcion,
              };

              savePostToLocalStorage(postData);
              sendPostToServer(postData);

              formulario.reset();
              cargarPosts();
          };
          reader.readAsDataURL(imagenArchivo);
      } else {
          alert('Por favor, selecciona una imagen.');
      }
  });

  function savePostToLocalStorage(post) {
      const posts = JSON.parse(localStorage.getItem('posts')) || [];
      posts.push(post);
      localStorage.setItem('posts', JSON.stringify(posts));
      console.log('Posts guardados en localStorage:', posts);
  }

  async function sendPostToServer(post) {
      try {
          const response = await fetch('http://localhost:5050/posts', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(post),
          });

          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log('Post enviado al servidor:', data);
      } catch (error) {
          console.error('Error al enviar el post al servidor:', error);
      }
  }

  window.deletePost = function (index) {
      const posts = JSON.parse(localStorage.getItem('posts')) || [];
      posts.splice(index, 1);
      localStorage.setItem('posts', JSON.stringify(posts));
      cargarPosts();
  };
});
