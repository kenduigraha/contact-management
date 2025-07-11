function renderLabelOptions(selectedLabels = []) {
  const select = document.getElementById('contact-label');
  if (!select) return;

  select.innerHTML = '';

  labels.forEach(label => {
    const option = document.createElement('option');
    option.value = label;
    option.textContent = label;

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
      const birthday = new Date(contact.birthdate).toDateString();
      li.innerHTML = `
        <strong>${contact.name}</strong><br>
        ${birthday}<br>
        ${contact.phone} - ${contact.email}<br>
        ${contact.company} - ${contact.jobTitle}<br>
        ${contact.address}<br>
        <small>${contact.notes}</small><br>
        <p>${contact.label}</p>
        <button onclick="editContact('${contact.id}')">Edit</button>
        <button onclick="deleteContact('${contact.id}')">Hapus</button>
      `;
      contactList.appendChild(li);
    });
}

function editContact(id) {
  const contact = contacts.find(c => c.id === id);
  const contactLabelsSelect = document.getElementById('contact-label');
  if (!contact) return;

  document.getElementById('contact-id').value = contact.id;
  document.getElementById('name').value = contact.name;
  document.getElementById('birthdate').value = contact.birthdate;
  document.getElementById('phone').value = contact.phone;
  document.getElementById('email').value = contact.email;
  document.getElementById('address').value = contact.address;
  document.getElementById('company').value = contact.company;
  document.getElementById('jobTitle').value = contact.jobTitle;
  document.getElementById('notes').value = contact.notes;

  contactLabelsSelect.querySelectorAll('option').forEach(opt => {
    opt.selected = contact.label.includes(opt.value);
  });

  // empty search input
  document.getElementById('search').value = '';

  // show cancel button
  document.getElementById("contact-cancel").style.visibility = 'visible';
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

  const id = document.getElementById('contact-id').value || `uuid-${Date.now()}`;
  const name = document.getElementById('name').value.trim();
  const birthdate = document.getElementById('birthdate').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const address = document.getElementById('address').value.trim();
  const company = document.getElementById('company').value.trim();
  const jobTitle = document.getElementById('jobTitle').value.trim();
  const notes = document.getElementById('notes').value.trim();
  const label = document.getElementById('contact-label').value.trim();

  const existingIndex = contacts.findIndex(c => c.id === id);

  const newContact = { id, name, birthdate, phone, email, address, company, jobTitle, notes, label };
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

function doSearchContact() {
  const searchInput = document.getElementById('search');
  searchInput.addEventListener('input', function () {
    renderContacts(this.value);
  });
}

const cancelFormButton = document.getElementById('contact-cancel');

cancelFormButton.addEventListener('click', function () {
  console.log('cancel click');

  document.getElementById('contact-id').value = '';
  document.getElementById('name').value = '';
  document.getElementById('phone').value = '';
  document.getElementById('email').value = '';
  document.getElementById('address').value = '';
  document.getElementById('company').value = '';
  document.getElementById('jobTitle').value = '';
  document.getElementById('notes').value = '';
  document.getElementById('contact-label').value = 'Family';
});

renderLabelOptions([]);
renderContacts();
doSearchContact();