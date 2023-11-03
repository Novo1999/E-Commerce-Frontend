export const handleURLSortQuery = (value: string) => {
  let sortQuery
  switch (value) {
    case 'name-asc':
      sortQuery = 'a-z'
      break
    case 'name-desc':
      sortQuery = 'z-a'
      break
    case 'price-asc':
      sortQuery = 'price[a-z]'
      break
    case 'price-desc':
      sortQuery = 'price[z-a]'
  }
  return sortQuery
}

export const handleSortQuery = (value: string) => {
  let sortQuery
  switch (value) {
    case 'a-z':
      sortQuery = 'name-asc'
      break
    case 'z-a':
      sortQuery = 'name-desc'
      break
    case 'price[a-z]':
      sortQuery = 'price-asc'
      break
    case 'price[z-a]':
      sortQuery = 'price-desc'
  }
  return sortQuery
}
