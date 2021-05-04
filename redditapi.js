export default {
  search: async function (searchTerm, searchLimit, sort) {
    return await fetch(
      `http://www.reddit.com/search.json?q=${searchTerm}&sort=${sort}&limit=${searchLimit}`
    )
      .then((res) => res.json())
      .then((data) => data.data.children.map((data) => data.data))
      .catch((err) => console.log(err))
  },
}