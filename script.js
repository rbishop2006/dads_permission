// DOM variables
const form = document.querySelector("form"),
  header = document.querySelector("#header"),
  headerContainer = document.querySelector("#header-container"),
  container = document.querySelector(".container"),
  detailsHeader = document.querySelector("#details-header"),
  name = document.querySelector("#name"),
  email = document.querySelector("#email"),
  address = document.querySelector("#address"),
  phone = document.querySelector("#phone"),
  iq = document.querySelector("#iq"),
  attributes = document.querySelectorAll("input[type=checkbox]"),
  genders = document.querySelectorAll("input[name='gender']"),
  male = document.querySelector("#male"),
  female = document.querySelector("#female"),
  other = document.querySelector("#other"),
  date = document.querySelector("input[type='date']"),
  tattoos = document.querySelector("#tattoos"),
  tooOld = document.querySelector("#too-old"),
  van = document.querySelector("#van"),
  job = document.querySelector("#job"),
  unemployed = document.querySelector("#unemployed"),
  rich = document.querySelector("#rich"),
  publicLocation = document.querySelector("#public-location"),
  emptyParty = document.querySelector("empty-party"),
  emptyEducation = document.querySelector("empty-education"),
  politicalPersuasion = document.querySelector("#political-persuasion"),
  educationCompleted = document.querySelector("#education-completed"),
  textAreaEssay = document.querySelector("#text-area-essay"),
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
    attributesSelected === [] ||
    politicalPersuasion.value === "empty-party" ||
    educationCompleted.value === "empty-education" ||
    textAreaEssay.value === ""
  ) {
    fillFieldsMessage()
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
  for (gender of genders) {
    if (gender.checked) {
      selectedGender = gender.value
    }
  }
}

// Checkboxes attributes selected
let attributesSelected = []
const getAttributesSelected = () => {
  for (attribute of attributes) {
    if (attribute.checked) {
      attributesSelected.push(attribute.value)
    }
  }
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

//  Fill fields header
const fillFieldsMessage = () => {
  header.innerHTML = `<i class="fas fa-exclamation-circle"></i> PLEASE FILL ALL OPTIONS`
  headerContainer.style.backgroundColor = "var(--warningColor)"

  /*  BUG FIX NEEDED
      Checkboxes do not act properly when form submission occurs
      more than once due to user error.  Double entries occur if form is not submitted on first attempt.
  */
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
