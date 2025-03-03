class Contact {
    constructor(firstName, lastName, address, city, state, zip, phone, email) {
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


let contact1 = new Contact("Raksha", "Malviya", "Piplani", "Bhopal", "Madhya Pradesh", "400001", "451578", "Rak007@example.com");
console.log("Contact Created:", contact1);
