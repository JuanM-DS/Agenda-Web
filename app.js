const source = document.getElementById('source');
const contactForm = document.getElementById('contactForm');

const recargarTabla = ()=>{
  fetch('http://www.raydelto.org/agenda.php')
  .then(response => response.json())
  .then(data => {
    data.forEach(contacto => {
      const row = source.insertRow();
      row.insertCell().textContent = contacto.nombre;
      row.insertCell().textContent = contacto.apellido;
      row.insertCell().textContent = contacto.telefono;
    });
  });
};

  
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const telefono = document.getElementById('telefono').value;

  const newContact = { nombre, apellido, telefono };

  fetch('http://www.raydelto.org/agenda.php', {
    method: 'POST',
    body: JSON.stringify(newContact)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error adding contact: ${response.statusText}`);
    }
    return response.json();
  })
  .then(() => {
    return fetch(url)
      .then(response => response.json())
      .then(data => mostrarData(data));
  });
  document.getElementById('contactForm').reset();
  recargarTabla();
});

recargarTabla();