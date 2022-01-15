const formData = new FormData();
window.addEventListener("load", function(){

    showImages();

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
                        formData.append('files[]', result, result.name)
                        resolve()
                    },
                    error(err) {
                        console.log(err.message)
                        reject()
                    },
                })
            }))

        }
        Promise.all(promises).then(function () {
            addImages(formData);
        })

    })

});

function showImages() {
    var objXMLHttpRequest = new XMLHttpRequest();
    objXMLHttpRequest.onreadystatechange = function() {
    if(objXMLHttpRequest.readyState === 4) {
        if(objXMLHttpRequest.status === 200) {
            var data = objXMLHttpRequest.responseText;
            if (data){
                data = data.split(",");
                data.forEach(element => {
                    var a = document.createElement("img");
                    a.src = element;
                    a.width = 200;
                    a.height = 200;
                    a.alt = "Image.jpg";
                    document.body.appendChild(a);
                });

            }
        } else {
            alert('Error Code: ' +  objXMLHttpRequest.status);
            alert('Error Message: ' + objXMLHttpRequest.statusText);
        }
    }
    }
    objXMLHttpRequest.open('GET', 'list.php');
    objXMLHttpRequest.send();    
}

function addImages(param) {
    var objXMLHttpRequest = new XMLHttpRequest();
    objXMLHttpRequest.onreadystatechange = function() {
    if(objXMLHttpRequest.readyState === 4) {
        if(objXMLHttpRequest.status === 200) {
            console.log(objXMLHttpRequest.responseText);
            location.reload();
        } else {
            alert('Error Code: ' +  objXMLHttpRequest.status);
            alert('Error Message: ' + objXMLHttpRequest.statusText);
        }
    }
    }
    objXMLHttpRequest.open('POST', 'files-handler.php');
    objXMLHttpRequest.send(param);   
}