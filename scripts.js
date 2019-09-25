// Defining golbal userData object ot be used later
const userData = { languages: {}, gender: {} };

// Listener that runs functions depending on which page is rendered
document.addEventListener("init", function(event) {
  const page = event.target;
  if (page.id === "register") {
    // Click handler for the submit button
    page.querySelector("#submit-button").onclick = function() {
      // Injecting all of the user input into the userData object
      userData.name = page.querySelector("#name").value;
      userData.dob = page.querySelector("#date").value;
      userData.languages.CSS = page.querySelector("#css").checked;
      userData.languages.HTML = page.querySelector("#html").checked;
      userData.languages.JavaScript = page.querySelector("#javascript").checked;
      userData.gender.male = page.querySelector("#male").checked;
      userData.gender.female = page.querySelector("#female").checked;
      userData.gender.other = page.querySelector("#other").checked;
      userData.position = page.querySelector("#selector").value;

      // navigates to second onsen page
      document
        .querySelector("#navigator")
        .pushPage("profile.html", { data: { title: "Profile" } });
    };
  } else if (page.id === "profile") {
    // Changed the toolbar to show the user which page they are on
    page.querySelector("ons-toolbar .center").innerHTML = page.data.title;

    // Uses short circuiting to validate which fields have been updated by the user,
    // and then runs the appropriate function to update the DOM with relevant the user data
    userData.name && injectUserString(page, "Name", userData.name);
    userData.dob && injectUserString(page, "DOB", userData.dob);
    Object.values(userData.languages).includes(true) &&
      injectUserChoice(page, "Languages", userData.languages);
    // These don't need validation because there are default values
    injectUserChoice(page, "Gender", userData.gender);
    injectUserString(page, "Desired Position", userData.position);
  }
});

// Function for injecting user data that is returned as strings
const injectUserString = (page, label, value) => {
  // Creates relevant list elements, assigns the user inputted values, and injects them into the DOM
  let newListHeader = document.createElement("ons-list-header");
  let newListItem = document.createElement("ons-list-item");
  newListHeader.innerHTML = label;
  newListItem.innerHTML = value;
  page.querySelector("#user-data").appendChild(newListHeader);
  page.querySelector("#user-data").appendChild(newListItem);
};

// Function for injecting user data that is returned as booleans
const injectUserChoice = (page, label, values) => {
  // Creates list header element, assigns the relevant label, and injects it into the DOM
  let newListHeader = document.createElement("ons-list-header");
  newListHeader.innerHTML = label;
  page.querySelector("#user-data").appendChild(newListHeader);
  // Loops through the relevant userData object, creates list elements with the data, and injects them into the DOM
  for (var key in values) {
    let newListItem = document.createElement("ons-list-item");
    // Validates label to assign appropriate casing
    newListItem.innerHTML =
      label === "Gender" ? key.charAt(0).toUpperCase() + key.slice(1) : key;
    values[key] && page.querySelector("#user-data").appendChild(newListItem);
  }
};
