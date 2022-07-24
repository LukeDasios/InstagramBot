const puppeteer = require("puppeteer")

let alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
]

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const generateFirstName = () => {
  return "Jacob"
}

const generateLastName = () => {
  return "Landry"
}

const generateRandomNumbers = () => {
  let str = ""

  for (let i = 0; i < 8; i++) {
    str += Math.round(Math.random() * 10)
  }

  return str
}

const generateRandomPassword = () => {
  let str = ""

  for (let i = 0; i < 15; i++) {
    let randomNumber = Math.round(Math.random() * 25)

    if (i === 0) {
      str += alphabet[randomNumber].toUpperCase()
    } else if (i === 4) {
      str += randomNumber
    } else if (i % 5 === 0) {
      str += "-"
    } else {
      str += alphabet[randomNumber]
    }
  }

  return str
}

const generateRandomMonth = () => {
  return months[Math.round(Math.random() * 11)]
}

const generateRandomYear = () => {
  let age = 18 + Math.round(Math.random() * 22)

  return new Date().getFullYear() - age
}

const generateRandomDelayTime = () => {
  return 100 + Math.round(Math.random() * 500)
}

const main = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  })

  // FIRST PAGE

  const page = await browser.newPage()
  await page.goto(
    "https://accounts.google.com/signup/v2/webcreateaccount?flowName=GlifWebSignIn&flowEntry=SignUp"
  )

  const firstName = generateFirstName()
  const lastName = generateLastName()
  const password = generateRandomPassword()
  const username = `${firstName}.${lastName}${generateRandomNumbers()}`
  console.log(`username: ${username}\npassword: ${password}`)

  await page.type(`#firstName`, firstName, { delay: generateRandomDelayTime() })
  await page.type(`#lastName`, lastName, { delay: generateRandomDelayTime() })
  await page.type(`#username`, username, { delay: generateRandomDelayTime() })
  await page.type(`input[name="Passwd"]`, password, { delay: generateRandomDelayTime() })
  await page.type(`input[name="ConfirmPasswd"]`, password, { delay: generateRandomDelayTime() })

  await page.click(`#accountDetailsNext`, { delay: generateRandomDelayTime() })

  // SECOND PAGE
  const birthYear = generateRandomYear()

  await page.select(`#month`, generateRandomMonth(), { delay: generateRandomDelayTime() })
  await page.type(`#day`, Math.round(Math.random() * 28), { delay: generateRandomDelayTime() })
  await page.type(`#year`, birthYear, { delay: generateRandomDelayTime() })
  await page.select(`#gender`, "Rather not say", { delay: generateRandomDelayTime() })

  await page.click(`span[jsname="V67aGc"]`, { delay: generateRandomDelayTime() })

  // THIRD PAGE
  await page.click(`span[jsname="V67aGc"]`, { delay: generateRandomDelayTime() })

  // await browser.close();
}

main()
