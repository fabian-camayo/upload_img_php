window.addEventListener('load', function () {

    const form = document.querySelector('form')

    form.addEventListener('submit', function (e) {

        e.preventDefault()
        const files = form.querySelector('[type="file"]').files
        const promises = []

        for (let file of files) {

            promises.push(new Promise(function (resolve, reject) {
                new Compressor(file, {
                    quality: 0.6,
                    success(result) {
                        //TODO
                    },
                    error(err) {
                        console.log(err.message)
                        reject()
                    },
                })
            }))

        }

    })

})