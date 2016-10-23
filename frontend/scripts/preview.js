function PreviewService() {

window.onload = () => {
	let preview = getURLParameter('preview');
	if(preview!=undefined) {



		CourseBuilder.video('390', '640', preview);
	}else{
		console.log("error");
	}
}


}

  const getURLParameter = (name) => {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
  }


document.getElementBy('previewId').value  = getURLParameter('preview');

const previewService = new PreviewService();
