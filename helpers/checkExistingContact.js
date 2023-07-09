const checkExistingContact = (contacts, name, email, phone) => {
	const indexByName = contacts.findIndex(item => item.name === name);
	const indexByEmail = contacts.findIndex(item => item.email === email);
	const indexByPhone = contacts.findIndex(item => item.phone === phone);

	if (indexByName !== -1) {
		return `Contact with name ${name} is already exist`;
	} else if (indexByEmail !== -1) {
		return `Contact with email ${email} is already exist`;
	} else if (indexByPhone !== -1) {
		return `Contact with phone ${phone} is already exist`;
	}
};

module.exports = checkExistingContact;
