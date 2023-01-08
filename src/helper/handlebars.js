module.exports = {
    moneyFormat: (string) => {
      const formater = new Intl.NumberFormat('en-US', 
        { style: 'currency', currency: 'VND'}
      )
      return formater.format(string);
    },
    sort: (field, local_sort) => {
        // console.log(local_sort.enable, local_sort.column, local_sort.type);
        let sortType = field === local_sort.column ?  local_sort.type : "default"
        // console.log(sortType)
      const icons = {
        default: 'funnel',
        asc: 'arrow-down',
        desc: 'arrow-up',
      }
      const types = {
        default: "desc",
        asc: 'desc',
        desc: 'asc',
      }

      const icon = icons[sortType]
      const type = types[sortType]


      return `<a href="?_sort&column=${field}&type=${type}">
      <ion-icon name="${icon}-outline"></ion-icon>
      </a>`

    }
  }