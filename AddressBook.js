class Contact {
    constructor(firstName, lastName, address, city, state, zip, phone, email) {
        // Regular expressions for validation
        let nameRegex = /^[A-Z][a-zA-Z]{2,}$/;
        let addressRegex = /^[A-Za-z0-9\s]{4,}$/;
        let zipRegex = /^\d{6}$/;
        let phoneRegex = /^[7-9]\d{9}$/;
        let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Validate input data
        if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
            throw new Error("Invalid Name! Should start with a capital and be at least 3 characters.");
        }
        if (!addressRegex.test(address) || !addressRegex.test(city) || !addressRegex.test(state)) {
            throw new Error("Invalid Address, City or State! Should have at least 4 characters.");
        }
        if (!zipRegex.test(zip)) {
            throw new Error("Invalid Zip! Should be exactly 6 digits.");
        }
        if (!phoneRegex.test(phone)) {
            throw new Error("Invalid Phone Number! Should be a 10-digit number starting with 7, 8, or 9.");
        }
        if (!emailRegex.test(email)) {
            throw new Error("Invalid Email Address!");
        }

        // Initialize contact properties
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phone = phone;
        this.email = email;
    }
}

/**
 * Class representing an Address Book
 */
class AddressBook {
    /**
     * Constructor for AddressBook class
     */
    constructor() {
        // Initialize an empty array to store contacts
        this.contacts = [];
    }

    /**
     * Add a contact to the address book
     * @param {Contact} contact 
     */
    addContact(contact) {
        // Check if the contact is an instance of Contact class
        if (contact instanceof Contact) {
            // Check for duplicate contact
            if (this.contacts.some(c => c.firstName === contact.firstName && c.lastName === contact.lastName)) {
                console.log("Duplicate Contact! Cannot add.");
                return;
            }
            // Add contact to the address book
            this.contacts.push(contact);
            console.log("Contact added successfully");
        } else {
            throw new Error("Invalid Contact !");
        }
    }

    /**
     * Edit a contact in the address book
     * @param {string} firstName 
     * @param {object} updatedDetails 
     */
    editContact(firstName, updatedDetails) {
        // Find the contact to be edited
        let contact = this.contacts.find(c => c.firstName === firstName);
        if (!contact) {
            console.log("Contact not found!");
            return;
        }

        try {
            // Create a new contact with updated details
            let updatedContact = new Contact(
                updatedDetails.firstName || contact.firstName,
                updatedDetails.lastName || contact.lastName,
                updatedDetails.address || contact.address,
                updatedDetails.city || contact.city,
                updatedDetails.state || contact.state,
                updatedDetails.zip || contact.zip,
                updatedDetails.phone || contact.phone,
                updatedDetails.email || contact.email
            );

            // Update the contact in the address book
            let index = this.contacts.indexOf(contact);
            this.contacts[index] = updatedContact;
            console.log("Contact updated successfully!");

        } catch (error) {
            console.error("Update failed:", error.message);
        }
    }

    deleteContact(firstName) {
        // Find the contact to be deleted
        let initialLength = this.contacts.length;
        this.contacts = this.contacts.filter(c => c.firstName !== firstName);

        // Check if the contact was deleted
        if (this.contacts.length < initialLength) {
            console.log(`Contact '${firstName}' deleted successfully!`);
        } else {
            console.log("Contact not found!");
        }
    }
    countContacts() {
        return this.contacts.reduce(count => count + 1, 0);
    }

    /**
     * Search for contacts by city or state
     */
    searchByCityOrState(city, state) {
        return this.contacts.filter(c => c.city === city || c.state === state);
    }

    /**
     * View contacts grouped by city or state
     */
    viewByCityOrState() {
        let cityMap = new Map();
        let stateMap = new Map();

        this.contacts.forEach(contact => {
            cityMap.set(contact.city, (cityMap.get(contact.city) || []).concat(contact));
            stateMap.set(contact.state, (stateMap.get(contact.state) || []).concat(contact));
        });

        console.log("Persons by City:", cityMap);
        console.log("Persons by State:", stateMap);
    }

    /**
     * Get the count of contacts by city or state
     */
    countByCityOrState() {
        let cityCount = {};
        let stateCount = {};

        this.contacts.forEach(contact => {
            cityCount[contact.city] = (cityCount[contact.city] || 0) + 1;
            stateCount[contact.state] = (stateCount[contact.state] || 0) + 1;
        });

        console.log("Count by City:", cityCount);
        console.log("Count by State:", stateCount);
    }

    /**
     * Sort contacts by name
     */
    sortByName() {
        this.contacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
    }

    /**
     * Sort contacts by city
     */
    sortByCity() {
        this.contacts.sort((a, b) => a.city.localeCompare(b.city));
    }

    /**
     * Sort contacts by state
     */
    sortByState() {
        this.contacts.sort((a, b) => a.state.localeCompare(b.state));
    }

    /**
     * Sort contacts by zip
     */
    sortByZip() {
        this.contacts.sort((a, b) => a.zip.localeCompare(b.zip));
    }

    /**
     * Display all contacts in the address book
     */
    displayContacts() {
        console.log("Address Book", this.contacts);
    }
}

// Create a new address book
let addressBook = new AddressBook();

try {
    // Create new contacts
    let contact1 = new Contact("Raksha", "Malviya", "Piplani", "Bhopal", "Madhya Pradesh", "400001", "9876543210", "rak07@example.com");
    let contact2 = new Contact("Nisha", "Kumari", "Piplani", "Bhopal", "Madhya Pradesh", "400001", "9876543210", "exa7654@example.com");
    let contact3 = new Contact("Raksha", "Malviya", "Piplani", "Bhopal", "Madhya Pradesh", "400001", "9876543210", "rak07@example.com");
    let contact4 = new Contact("Rak", "Malviya", "Santa lane", "Boston", "Madhya Pradesh", "400001", "9876543210", "ana@example.com");
    let contact = new Contact("Ashi", "Singh", "Santa lane", "Boston", "Uttar Pradesh", "400001", "9876543210", "ashi@example.com");

    // Add contacts to the address book
    addressBook.addContact(contact1);
    addressBook.addContact(contact2);
    addressBook.displayContacts();

    // Edit a contact
    addressBook.editContact("Raksha", { city: "Amsterdam" });
    addressBook.displayContacts();

    // Delete a contact
    addressBook.deleteContact("Nisha");
    addressBook.displayContacts();

    // Search for contacts by city or state
    console.log("Searching by City Or State", addressBook.searchByCityOrState("Bhopal", "Madhya Pradesh"));

    // Get the total number of contacts
    console.log("Total Contacts:", addressBook.countContacts());

    // View contacts grouped by city or state
    addressBook.viewByCityOrState();

    // Get the count of contacts by city or state
    addressBook.countByCityOrState();

    // Sort contacts by name
    addressBook.sortByName();
    addressBook.displayContacts();

    // Sort contacts by city
    addressBook.sortByCity();
    addressBook.displayContacts();

    // Sort contacts by state
    addressBook.sortByState();
    addressBook.displayContacts();

    // Sort contacts by zip
    addressBook.sortByZip();
    addressBook.displayContacts();

} catch (error) {
    console.error(error.message);
}