const Handlebars = require("handlebars")
module.exports = {
    moneyFormat: (string) => {
      const formater = new Intl.NumberFormat('en-US', 
        { style: 'currency', currency: 'VND'}
      )
      return formater.format(string);
    },
    sort: (field, local_sort) => {
      let sortType = field === local_sort.column ?  local_sort.type : "default"
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

      // safe string
      const href = Handlebars.escapeExpression(`?_sort&column=${field}&type=${type}`) 

      const output = `<a href="${href}">
      <ion-icon name="${icon}-outline"></ion-icon>
      </a>`

      return new Handlebars.SafeString(output)

    },
    pagination: (local_page) => {
      let html = "";
      for (let i = 1; i <= local_page.totalPage; i++) {
        html += `<li class="pagination-item">
        <a class="pagination-item_link" href="/products?_page=${i}">${i}</a>
        </li>`
      }
      return html;      
    }
  }