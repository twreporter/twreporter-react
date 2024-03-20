function generateRandomDate() {
  const start = new Date(2020, 0, 1).getTime()
  const end = new Date(2024, 12, 31).getTime()
  return new Date(start + Math.random() * (end - start)).toISOString()
}

function generateRandomAmount() {
  return Math.floor(Math.random() * (50000 - 100 + 1)) + 100
}

function generateRandomType() {
  const types = ['prime', 'periodic']
  return types[Math.floor(Math.random() * types.length)]
}

function generateRandomStatus() {
  const statuses = [
    'to_pay',
    'paying',
    'paid',
    'fail',
    'stopped',
    'invalid',
    'refunded',
  ]
  return statuses[Math.floor(Math.random() * statuses.length)]
}

function generateOrderNumber() {
  const number = Math.floor(Math.random() * 8999999999) + 1000000000 // To ensure the number is not too short
  return `twreporter-${number}`
}

const testData = [
  {
    type: 'prime',
    created_at: '2023/9/08',
    amount: 100,
    status: 'paid',
    order_number: 'twreporter-16941665288247097890112312312312312313',
  },
  {
    type: 'prime',
    created_at: '2023/9/22',
    amount: 100000000,
    status: 'refunded',
    order_number: 'twreporter-169536183193746011101',
  },
  {
    type: 'periodic',
    created_at: '2024/1/10',
    amount: 5000,
    status: 'paying',
    order_number: 'twreporter-170658751104589950710',
  },
  {
    type: 'periodic',
    created_at: '2024/2/28',
    amount: 100,
    status: 'stopped',
    order_number: 'twreporter-170660454176945197210',
  },
  {
    type: 'prime',
    created_at: '2024/1/31',
    amount: 10000,
    status: 'fail',
    order_number: 'twreporter-169536183193746022222',
  },
]

export const generateFakeData = count => {
  const data = []
  for (let i = 0; i < count - 5; i++) {
    data.push({
      type: generateRandomType(),
      created_at: generateRandomDate(),
      amount: generateRandomAmount(),
      status: generateRandomStatus(),
      order_number: generateOrderNumber(),
    })
  }
  return [...testData, ...data]
}
