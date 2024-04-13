import fs from 'fs'
import { faker } from '@faker-js/faker'

// Seed to create the same output every time
faker.seed(1)

const PERSON_COUNT = 10

interface Person {
  name: string
  zodiacSign: string
  bio: string
  jobTitle: string
  emailId: string
}

interface MockData {
  persons: Person[]
}

// Generate
const mock: MockData = {
  persons: []
}

for (let i = 0; i < PERSON_COUNT; i++) {
  const person: Person = {
    name: faker.person.fullName(),
    zodiacSign: faker.person.zodiacSign(),
    bio: faker.person.bio(),
    jobTitle: faker.person.jobTitle(),
    emailId: faker.internet.email().toLowerCase()
  }
  mock.persons.push(person)
}

// Write to file
fs.writeFile('mock.json', JSON.stringify(mock, null, 2), 'utf8', err => {
  if (!err) {
    console.log('Written generated mock to mock.json!')
  } else {
    console.error(err)
  }
})
