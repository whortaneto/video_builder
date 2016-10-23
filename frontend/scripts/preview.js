function PreviewService() {
	this.getURLParameter = (name) => {
		return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
	}

}

const previewService = new PreviewService();
document.getElementById('previewId').value  = previewService.getURLParameter('preview');
