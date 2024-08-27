document.getElementById('create-button').addEventListener('click', createUser);

async function createUser() {
    renderLoadingState();
    try {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const profilePicture = document.getElementById('profile-picture').value || 'https://avatar.iran.liara.run/public/13';

        if (!username || !password || !profilePicture) {
            renderErrorState('Todos los campos son obligatorios. Por favor, complétalos.');
            return;
        }

        const response = await fetch('http://localhost:5050/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, profilePicture }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.username) {
            renderData('Usuario creado exitosamente');
            // Redirigir a la página de inicio de sesión después de crear el usuario
            setTimeout(() => {
                window.location.href = 'http://127.0.0.1:3000/login/index.html';
            }, 1000); // Esperar 1 segundo para mostrar el mensaje
        } else {
            renderErrorState('Error inesperado al crear el usuario.');
        }
    } catch (error) {
        renderErrorState('Fallo al crear el usuario. Por favor, intenta de nuevo.');
    }
}

function renderErrorState(message) {
    const container = document.getElementById('data-container');
    container.innerHTML = '';
    container.innerHTML = `<p>${message}</p>`;
    console.log(message);
}

function renderLoadingState() {
    const container = document.getElementById('data-container');
    container.innerHTML = '';
    container.innerHTML = '<p>Cargando...</p>';
    console.log('Cargando...');
}

function renderData(message) {
    const container = document.getElementById('data-container');
    container.innerHTML = '';
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = message;
    container.appendChild(div);
}
