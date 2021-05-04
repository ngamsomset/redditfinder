export default {
  search: function (searchTerm, searchLimit, sort) {
    return fetch(
      `http://www.reddit.com/search.json?q=${searchTerm}&sort=${sort}&limit=${searchLimit}`
    )
      .then((res) => res.json())
      .then((data) => data.data.children.map((data) => data.data))
      .catch((err) => console.log(err))
  },
}
