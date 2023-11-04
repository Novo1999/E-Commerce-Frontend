export const handleURLSortQuery = (value: string) => {
  switch (value) {
    case 'name-asc':
      return 'a-z'
    case 'name-desc':
      return 'z-a'
    case 'price-asc':
      return 'price[a-z]'

    case 'price-desc':
      return 'price[z-a]'
  }
}

export const handleSortQuery = (value: string) => {
  switch (value) {
    case 'a-z':
      return 'name-asc'
    case 'z-a':
      return 'name-desc'
    case 'price[a-z]':
      return 'price-asc'
    case 'price[z-a]':
      return 'price-desc'
  }
}

export const handleSelectPlaceholderValue = (value: string) => {
  switch (value) {
    case 'a-z':
      return 'Name [A-Z]'
    case 'z-a':
      return 'Name [Z-A]'
    case 'price[a-z]':
      return 'Price (Low-High)'
    case 'price[z-a]':
      return 'Price (High-Low)'
  }
}

export const constructQueryString = (value: string) => {
  const regex = /[^&\s]+/g
  const matches = value.match(regex)

  return matches
}
