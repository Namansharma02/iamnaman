import fs from 'fs'
import path from 'path'

export function getPhotographyImages() {
  const photosDirectory = path.join(process.cwd(), 'public', 'photography')

  try {
    // Check if directory exists
    if (!fs.existsSync(photosDirectory)) {
      return []
    }

    const files = fs.readdirSync(photosDirectory)

    // Filter for image files only
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif']
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase()
      return imageExtensions.includes(ext)
    })

    // Sort files naturally (photo-1, photo-2, etc.)
    imageFiles.sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)?.[0] || '0')
      const numB = parseInt(b.match(/\d+/)?.[0] || '0')
      return numA - numB
    })

    // Return array of photo objects
    return imageFiles.map(file => ({
      src: `/photography/${file}`,
      alt: `Photography - ${file}`,
      title: path.parse(file).name
    }))
  } catch (error) {
    console.error('Error reading photography directory:', error)
    return []
  }
}
