const BASE_URL = 'https://api.api-onepiece.com/v2/characters/en'


export const getCharacters = async () => {
  try {
    const response = await fetch(`${BASE_URL}`)

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching characters:', error)
    throw error
  }
}
