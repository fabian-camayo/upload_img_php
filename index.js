const formData = new FormData();
window.addEventListener("load", function(){

    showImages();

    const form = document.querySelector('form')

    form.addEventListener('submit', function (e) {

        e.preventDefault()
        const files = form.querySelector('[type="file"]').files
        const promises = []

        for (let file of files) {
            var filePath = file.name;
            var allowed = /(.jpg)$/i;
            if(!allowed.exec(filePath)){
                $('body').toast({
                    class: 'error',
                    showIcon: false,
                    message: 'La imagen '+ file.name +' no es tipo JPG'
                });
                if(files.length == 1){
                    document.querySelector('form').reset();
                }
                
            } else{ 
                promises.push(new Promise(function (resolve, reject) {
                    new Compressor(file, {
                        quality: 0.6,
                        success(result) {
                            formData.append('files[]', result, result.name)
                            resolve()
                        },
                        error(err) {
                            $('body').toast({
                                class: 'error',
                                showIcon: false,
                                message: 'Error Compressor: '+ err.message
                            });
                            reject()
                        },
                    })
                }))
            }
        }
        if (promises.length > 0){
            Promise.all(promises).then(function () {
                addImages(formData);
            })
        }

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
            $('body').toast({
                class: 'error',
                showIcon: false,
                message: 'Error: '+objXMLHttpRequest.status+' ' +objXMLHttpRequest.statusText
            });
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
        response = JSON.parse(objXMLHttpRequest.responseText)
        if(objXMLHttpRequest.status === 200 & response.success) {
            $('body').toast({
                class: 'success',
                showIcon: false,
                message: 'Imágenes guardas con éxito: '+ response.message
            });
            document.querySelector('form').reset();
            showImages();
        } else {
            document.querySelector('form').reset();
            $('body').toast({
                class: 'error',
                showIcon: false,
                message: 'Error: '+objXMLHttpRequest.status+' ' +response.message
            });
        }
    }
    }
    objXMLHttpRequest.open('POST', 'files-handler.php');
    objXMLHttpRequest.send(param);   
}