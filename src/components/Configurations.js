export const config = `
setInterval(() => {

    if (document.querySelector('.col-md-6 col-sm-6 rightside')) {
      document.querySelector('.col-md-6 col-sm-6 rightside').style.display = 'none'
    }
}, 1000)
`