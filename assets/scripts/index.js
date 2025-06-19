function renderLabelOptions(selectedLabels = []) {
  const select = document.getElementById('contact-label');
  if (!select) return;

  // Kosongkan dulu
  select.innerHTML = '';

  // Tambahkan setiap label sebagai <option>
  labels.forEach(label => {
    const option = document.createElement('option');
    option.value = label;
    option.textContent = label;

    // Tandai sebagai selected jika sudah dipilih
    if (selectedLabels.includes(label)) {
      option.selected = true;
    }

    select.appendChild(option);
  });
}

function renderContacts(filter = '') {
  let contactList = document.getElementById('contact-list');
  contactList.innerHTML = '';
  console.log('contacts:', contacts);
  // to filter contact for search
  const filteredContacts = contacts.filter(contact => {
    const values = Object.values(contact).join(' ').toLowerCase();
    return values.includes(filter.toLowerCase());
  });
  filteredContacts
    .forEach(contact => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${contact.name}</strong><br>
        ${contact.phone} - ${contact.email}<br>
        ${contact.company} - ${contact.jobTitle}<br>
        ${contact.address}<br>
        <small>${contact.notes}</small><br>
        <button onclick="editContact('${contact.id}')">Edit</button>
        <button onclick="deleteContact('${contact.id}')">Hapus</button>
      `;
      contactList.appendChild(li);
    });
}

function deleteContact(id) {
  const searchInput = document.getElementById('search');
  contacts = contacts.filter(c => c.id !== id);
  localStorage.setItem('contacts', JSON.stringify(contacts));
  renderContacts(searchInput.value);
}

const form = document.getElementById('contact-form');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const id = `uuid-${Date.now()}`;
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const address = document.getElementById('address').value.trim();
  const company = document.getElementById('company').value.trim();
  const jobTitle = document.getElementById('jobTitle').value.trim();
  const notes = document.getElementById('notes').value.trim();
  const label = document.getElementById('contact-label').value.trim();

  const existingIndex = contacts.findIndex(c => c.id === id);

  const newContact = { id, name, phone, email, address, company, jobTitle, notes, label };
  console.log('newContact: ', newContact)

  // for update data
  if (existingIndex >= 0) {
    contacts[existingIndex] = newContact;
  } else {
    // create new data
    contacts.push(newContact);
  }

  localStorage.setItem('contacts', JSON.stringify(contacts));
  form.reset();
  document.getElementById('contact-id').value = '';
  renderContacts();
});


renderLabelOptions([]);
renderContacts();