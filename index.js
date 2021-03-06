import reddit from './redditapi'
const searchForm = document.getElementById('search-form')
const searchBtn = document.getElementById('search-btn')
const searchInput = document.getElementById('search-input')

// Form Event Listener
searchForm.addEventListener('submit', (e) => {
  // Need search input here and limits
  const searchTerm = searchInput.value
  const sort = document.querySelector('input[name="sortby"]:checked').value

  //   Get limit value
  const searchLimit = document.getElementById('limit').value

  // Form validation

  if (searchTerm === '') {
    // Show message
    showMessage('Please add the keywords', 'alert-danger')
  }
  //   clear input
  searchInput.value = ''
  //   Search Reddit
  reddit.search(searchTerm, searchLimit, sort).then((results) => {
    let output = '<div class="card-columns">'
    // Loop through the results
    results.forEach((post) => {
      // Check if post got image
      const image = post.preview
        ? post.preview.images[0].source.url
        : 'https://external-preview.redd.it/iDdntscPf-nfWKqzHRGFmhVxZm4hZgaKe5oyFws-yzA.png?auto=webp&s=38648ef0dc2c3fce76d5e1d8639234d8da0152b2'

      output += `
        <div class="card">
    <img src="${image}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${post.title}</h5>
    <p class="card-text">${truncate(post.selftext, 100)}</p>
    <a href="${post.url}" target="_blank" class="btn btn-success">Read More</a>
        <hr>
        <span class="badge badge-primary">SubReddit: ${post.subreddit}</span>
        <span class="badge badge-secondary">Score: ${post.score}</span>
    </div>
        </div>
        
        `
    })
    output += '</div>'
    document.getElementById('results').innerHTML = output
  })

  e.preventDefault()
})

//  showMessage
function showMessage(message, className) {
  // Create div with the message and add class to it
  const div = document.createElement('div')
  div.className = `alert ${className}`
  div.appendChild(document.createTextNode(message))
  // Get the elements that we want to insert in between.
  const searchContainer = document.getElementById('search-container')
  const search = document.getElementById('search')

  // Insert
  searchContainer.insertBefore(div, search)
  // Remove
  setTimeout(() => {
    document.querySelector('.alert').remove()
  }, 2000)
}

// truncate text function
function truncate(string, limit) {
  const shortened = string.indexOf(' ', limit)
  if (shortened == -1) return string
  return string.substring(0, shortened)
}
