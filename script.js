// DOM variables
const form = document.querySelector("form"),
  header = document.querySelector("#header"),
  headerContainer = document.querySelector("#header-container"),
  container = document.querySelector(".container"),
  detailsHeader = document.querySelector("#details-header"),
  name = document.querySelector("#name"),
  nameLabel = document.querySelector('label[for="name"]'),
  email = document.querySelector("#email"),
  emailLabel = document.querySelector('label[for="email"]'),
  address = document.querySelector("#address"),
  addressLabel = document.querySelector('label[for="address"]'),
  phone = document.querySelector("#phone"),
  phoneLabel = document.querySelector('label[for="phone"]'),
  iq = document.querySelector("#iq"),
  iqLabel = document.querySelector('label[for="iq"]'),
  attributes = document.querySelectorAll("input[name='attributes']"),
  genders = document.querySelectorAll("input[name='gender']"),
  genderHeading = document.querySelector("#gender-heading"),
  genderLabelMale = document.querySelector('label[for="male"]'),
  genderLabelFemale = document.querySelector('label[for="female"]'),
  genderLabelOther = document.querySelector('label[for="other"]'),
  male = document.querySelector("#male"),
  female = document.querySelector("#female"),
  other = document.querySelector("#other"),
  date = document.querySelector("input[type='date']"),
  dateHeading = document.querySelector("label[for='date-night']"),
  attributesHeading = document.querySelector("#checkboxes-heading"),
  tattoos = document.querySelector("#tattoos"),
  tattoosLabel = document.querySelector('label[for="tattoos"]'),
  tooOld = document.querySelector("#too-old"),
  tooOldLabel = document.querySelector('label[for="too-old"]'),
  van = document.querySelector("#van"),
  vanLabel = document.querySelector('label[for="van"]'),
  job = document.querySelector("#job"),
  jobLabel = document.querySelector('label[for="job"]'),
  unemployed = document.querySelector("#unemployed"),
  unemployedLabel = document.querySelector('label[for="unemployed"]'),
  rich = document.querySelector("#rich"),
  richLabel = document.querySelector('label[for="rich"]'),
  publicLocation = document.querySelector("#public-location"),
  publicLocationLabel = document.querySelector('label[for="public-location"]'),
  politicalPersuasion = document.querySelector("#political-persuasion"),
  politicalPersuasionLabel = document.querySelector(
    'label[for="political-persuasion"]'
  ),
  educationCompleted = document.querySelector("#education-completed"),
  educationCompletedLabel = document.querySelector(
    'label[for="education-completed"]'
  ),
  textAreaEssay = document.querySelector("#text-area-essay"),
  textAreaEssayHeader = document.querySelector("#essay-header"),
  submit = document.querySelector("#submit"),
  suitorSummary = document.querySelector("#suitor-summary")

// Check LS for existing suitors, init suitors array and suitor object
let localStorageSuitors = JSON.parse(localStorage.getItem("suitors"))

let suitors =
  localStorage.getItem("suitors") !== null ? localStorageSuitors : []

let suitor = {}

// Form Submission
const onSubmit = (e) => {
  e.preventDefault()

  genderCheck()
  getAttributesSelected()

  if (
    name.value === "" ||
    email.value === "" ||
    address.value === "" ||
    phone.value === "" ||
    iq.value === "" ||
    selectedGender === "" ||
    date.value === "" ||
    attributesSelected.length === 0 ||
    politicalPersuasion.value === "empty-party" ||
    educationCompleted.value === "empty-education" ||
    textAreaEssay.value === ""
  ) {
    fillFieldsMessage()
    handleErrors()
    setTimeout(() => {
      returnHeader()
    }, 4000)
  } else {
    suitor = {
      id: generateID(),
      name: name.value,
      email: email.value,
      address: address.value,
      phone: phone.value,
      iq: iq.value,
      gender: selectedGender,
      date: date.value,
      personalAttributes: attributesSelected,
      politicalPersuasion: politicalPersuasion.value,
      educationCompleted: educationCompleted.value,
      essay: textAreaEssay.value,
    }
    addSuitor(suitor)
    showSuitorSummary(suitor)
    updateLocalStorage(suitors)
    printSuitors()
    showSuccessHeader()
  }
}

// Radio buttons determining gender
let selectedGender = ""
const genderCheck = () => {
  selectedGender = ""
  for (gender of genders) {
    if (gender.checked) {
      selectedGender = gender.value
    }
  }
}

// Checkboxes attributes selected
let attributesSelected = []
const getAttributesSelected = () => {
  attributesSelected = []
  for (attribute of attributes) {
    if (attribute.checked) {
      attributesSelected.push(attribute.value)
    }
  }
}

//  Error header, fill all fields
const fillFieldsMessage = () => {
  header.innerHTML = `<i class="fas fa-exclamation-circle"></i> PLEASE FILL ALL OPTIONS`
  headerContainer.style.backgroundColor = "var(--warningColor)"
}

// Show successful application submission
const showSuccessHeader = () => {
  header.innerHTML = `<i class="fas fa-check-circle"></i> Success!! Application Submitted`
  headerContainer.style.backgroundColor = "var(--successColor)"
}

// Return header to original state
const returnHeader = () => {
  header.innerHTML = `<i class="fas fa-align-left"></i> Permission To Date My Daughter`
  headerContainer.style.backgroundColor = "var(--red)"
}

// Error handling in UI
const handleErrors = () => {
  // Name field
  if (name.value === "") {
    detailsHeader.classList.add("errorText")
    detailsHeader.innerText = "Please Complete All Details Fields"
    name.classList.add("error")
    nameLabel.classList.add("errorText")
    nameLabel.innerText = "Please Enter Your Name"
  } else {
    detailsHeader.classList.remove("errorText")
    detailsHeader.innerText = "Personal Details"
    name.classList.remove("error")
    nameLabel.classList.remove("errorText")
    nameLabel.innerText = "Name"
  }
  // Email field
  if (email.value === "") {
    detailsHeader.classList.add("errorText")
    detailsHeader.innerText = "Please Complete All Details Fields"
    email.classList.add("error")
    emailLabel.classList.add("errorText")
    emailLabel.innerText = "Please Enter Your Email"
  } else {
    detailsHeader.classList.remove("errorText")
    detailsHeader.innerText = "Personal Details"
    email.classList.remove("error")
    emailLabel.classList.remove("errorText")
    emailLabel.innerText = "Email"
  }
  // Address field
  if (address.value === "") {
    detailsHeader.classList.add("errorText")
    detailsHeader.innerText = "Please Complete All Details Fields"
    address.classList.add("error")
    addressLabel.classList.add("errorText")
    addressLabel.innerText = "Please Enter Your Address"
  } else {
    detailsHeader.classList.remove("errorText")
    detailsHeader.innerText = "Personal Details"
    address.classList.remove("error")
    addressLabel.classList.remove("errorText")
    addressLabel.innerText = "Address"
  }
  // Phone number field
  if (phone.value === "") {
    detailsHeader.classList.add("errorText")
    detailsHeader.innerText = "Please Complete All Details Fields"
    phone.classList.add("error")
    phoneLabel.classList.add("errorText")
    phoneLabel.innerText = "Please Enter Your Phone Number"
  } else {
    detailsHeader.classList.remove("errorText")
    detailsHeader.innerText = "Personal Details"
    phone.classList.remove("error")
    phoneLabel.classList.remove("errorText")
    phoneLabel.innerText = "Phone Number"
  }
  // IQ field
  if (iq.value === "") {
    detailsHeader.classList.add("errorText")
    detailsHeader.innerText = "Please Complete All Details Fields"
    iq.classList.add("error")
    iqLabel.classList.add("errorText")
    iqLabel.innerText = "Please Enter Your IQ"
  } else {
    detailsHeader.classList.remove("errorText")
    detailsHeader.innerText = "Personal Details"
    iq.classList.remove("error")
    iqLabel.classList.remove("errorText")
    iqLabel.innerText = "IQ"
  }
  // Radios for gender selection
  if (selectedGender === "") {
    genderLabelMale.classList.add("errorText")
    genderLabelFemale.classList.add("errorText")
    genderLabelOther.classList.add("errorText")
    genderHeading.innerText = "Please Select A Gender Option"
    genderHeading.classList.add("errorText")
  } else {
    genderLabelMale.classList.remove("errorText")
    genderLabelFemale.classList.remove("errorText")
    genderLabelOther.classList.remove("errorText")
    genderHeading.innerText = "Gender"
    genderHeading.classList.remove("errorText")
  }
  // Date input for proposed date night
  if (date.value === "") {
    date.classList.add("error")
    date.classList.add("errorText")
    dateHeading.innerText = "Please Select A Date"
    dateHeading.classList.add("errorText")
  } else {
    date.classList.remove("error")
    date.classList.remove("errorText")
    dateHeading.innerText = "Date of Proposed Outing"
    dateHeading.classList.remove("errorText")
  }
  // Checkboxes for selected attributes
  if (attributesSelected.length === 0) {
    attributesHeading.innerText = "Please Select At Least One Box"
    attributesHeading.classList.add("errorText")
    tattoosLabel.classList.add("errorText")
    tooOldLabel.classList.add("errorText")
    vanLabel.classList.add("errorText")
    jobLabel.classList.add("errorText")
    unemployedLabel.classList.add("errorText")
    richLabel.classList.add("errorText")
    publicLocationLabel.classList.add("errorText")
  } else {
    attributesHeading.innerHTML = "Check <span>ALL THAT APPLY<span>"
    attributesHeading.classList.remove("errorText")
    tattoosLabel.classList.remove("errorText")
    tooOldLabel.classList.remove("errorText")
    vanLabel.classList.remove("errorText")
    jobLabel.classList.remove("errorText")
    unemployedLabel.classList.remove("errorText")
    richLabel.classList.remove("errorText")
    publicLocationLabel.classList.remove("errorText")
  }
  // Political persuasion selection
  if (politicalPersuasion.value === "empty-party") {
    politicalPersuasion.classList.add("error")
    politicalPersuasionLabel.classList.add("errorText")
    politicalPersuasionLabel.innerText =
      "Please Select Your Political Persuasion"
  } else {
    politicalPersuasion.classList.remove("error")
    politicalPersuasionLabel.classList.remove("errorText")
    politicalPersuasionLabel.innerText = "Political Persuasion"
  }
  // Education level completed selection
  if (educationCompleted.value === "empty-education") {
    educationCompleted.classList.add("error")
    educationCompletedLabel.classList.add("errorText")
    educationCompletedLabel.innerText = "Please Select Your Completed Education"
  } else {
    educationCompleted.classList.remove("error")
    educationCompletedLabel.classList.remove("errorText")
    educationCompletedLabel.innerText = "Education Level Completed"
  }
  // Essay
  if (textAreaEssay.value === "") {
    textAreaEssayHeader.innerText = "Please Write Your Essay Here"
    textAreaEssayHeader.classList.add("errorText")
    textAreaEssay.classList.add("error")
  } else {
    textAreaEssayHeader.innerText = "Essay Section"
    textAreaEssayHeader.classList.remove("errorText")
    textAreaEssay.classList.remove("error")
  }
}

// Print suitors in LS
const printSuitors = () => {
  localStorageSuitors = JSON.parse(localStorage.getItem("suitors"))
  console.log(
    `
    
    Local Storage contains the full array of information from past applications if any.

    Kindly submit more than one application to observe the data in Local Storage for multiple suitors.

    Current number of suitors: ${
      localStorageSuitors !== null ? localStorageSuitors.length : 0
    } 

    ${
      localStorageSuitors !== null
        ? localStorageSuitors.map((suitor) => {
            return ` ${suitor.name}`
          })
        : `There are no suitors at this time.`
    }`
  )
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000)
}

// Show suitor summary
const showSuitorSummary = ({
  name,
  email,
  address,
  phone,
  date,
  gender,
  iq,
  educationCompleted,
  essay,
  politicalPersuasion,
  personalAttributes,
} = suitor) => {
  container.innerHTML = `
    <div class="suitor-summary">
      <p>Hello <span>${name}</span> !</br></br>
      You have requested a date with my daughter on <span>${date.slice(
        6
      )}</span>.  Many factors will be considered when deciding whether or not to grant permission.</br></br>  
      For instance, your <span>IQ of ${iq}</span> and your completed education level of <span>${educationCompleted}</span> will be important factors in my decision.</p></br>
      <p>Here is a summary of some of the information that you provided for consideration.</p></br>
      <ul>
        <li>Name: <span>${name}</span></li>
        <li>Gender: <span>${gender}</span></li>
        <li>Email: <span>${email}</span></li>
        <li>Address: <span>${address}</span></li>
        <li>Phone: <span>${phone}</span></li>
      </ul></br> 
      <ul>Personal Attributes:</br></br>
      ${personalAttributes.map((att) => {
        return `<li><span>${att}</span></li>`
      })}</ul></br>
      <p>Political Persuasion: <span>${politicalPersuasion} Party</span></p></br>
      <p>Why I should be allowed to date your daughter:</p></br>
      <p><span>"...${essay}..."</span></p></br>
      ${
        localStorageSuitors !== null
          ? ` <ul>...And just in case you were wondering, here is your competition of other applicants:</br></br>`
          : ""
      }
    
      ${
        localStorageSuitors !== null
          ? localStorageSuitors.map((suitor) => {
              return `<li><span>${suitor.name}</span></li>`
            })
          : `Good news!  It seems you are the first and only one suitor at this time.</br>`
      }
      </ul></br>
      <p>You will hear back from me within three weeks if your date is approved, thanks!!</p>
      <form onsubmit="location.reload()">
      <input type="submit" class="btn" id="exit-application" value="Exit Application"/>
      </input>
  </div>
  `
}

// Add new suitor to array of suitors in LS
const addSuitor = (suitor) => {
  suitors.push(suitor)
}

// Update LS with new array of suitors
const updateLocalStorage = (suitors) => {
  localStorage.setItem("suitors", JSON.stringify(suitors))
}

// Init message in Console Log
printSuitors()

// Event Listener
submit.addEventListener("click", onSubmit)
