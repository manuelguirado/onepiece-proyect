export interface Character {
  id: string | number
  name: string
  image_url: string
  age: string | number
  job: string
  bounty: string | number
  size: string
  is_yonko: boolean
  status: string
  fruit?: {
    name: string
    description: string
    type: string
    filename: string
  }
}
