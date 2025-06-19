let labels = JSON.parse(localStorage.getItem('labels')) || [];
let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

// seed data
if (labels.length === 0) {
  labels = ['Family', 'Friends', 'Work', 'Personal'];
  localStorage.setItem('labels', JSON.stringify(labels));
}

// seed data contacts
if (contacts.length === 0) {
  contacts = [{
    id: "uuid", // unique ID
    name: "[SEED] Nama Lengkap",
    phone: "08123456789",
    email: "nama@email.com",
    address: "Alamat rumah/kantor",
    notes: "Catatan tambahan",
    company: "Perusahaan",
    jobTitle: "Jabatan",
    label: "Work"
  }];
  localStorage.setItem('contacts', JSON.stringify(contacts));
}
