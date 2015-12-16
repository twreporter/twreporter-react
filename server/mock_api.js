function question(id) {
  let sampleContent = '--the question content--'
  return {
    id,
    content: `sample-${id}: ${sampleContent}`
  }
}

let questions = []
for (let i = 1; i < 11; i += 1) {
  questions.push(question(i))
}

module.exports = {
  questions
}
