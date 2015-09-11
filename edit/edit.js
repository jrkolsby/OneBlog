var update = {

	},setDraftMode = {
		populateDropzone: function(dropzone) {
			var existingFiles = [
				{ name: "1_large.png", size: 12345 },
				{ name: "1_medium.png", size: 12345 },
				{ name: "2_large.png", size: 12345 }
			];
			for (i = 0; i < existingFiles.length; i++) {
				dropzone.emit("addedfile", existingFiles[i]);
				dropzone.createThumbnailFromUrl(existingFiles[i], "temp/"+existingFiles[i].name);
				dropzone.emit("thumbnail", existingFiles[i], "temp/"+existingFiles[i].name);
				dropzone.emit("complete", existingFiles[i]);
		 		dropzone.files.push(existingFiles[i]);
			}
		},
		prepareDropZone: function(articleID) {
			var dropzoneElement = "<form class='dropzone'><div class='dz-message'>Upload Images</div><div class='fallback'><input name='file' type='file' multiple /></div></form>";
			$(dropzoneElement).attr("id", "dropzone-"+articleID).insertAfter($("article#"+articleID+" button"));
			var dropzone = new Dropzone("#dropzone-"+articleID , { url: "handler.php", 
														 maxFiles: 3,
														 uploadMultiple: true });
			dropzone.on("addedfile", function(file) {
				file.previewElement.addEventListener("click", function() {
					dropzone.removeFile(file);
					//Request to remove file from JSON
				});
			});
			setDraftMode.populateDropzone(dropzone);
		},
		prepareDeleteButton: function(articleID) {
			var deleteButtonElement = "<button class='delete'></button>";
			$(deleteButtonElement).appendTo("article#"+articleID).bind("click", function() {
				//Delete post
			});
		},
		prepareNotebook: function(articleID) {
			$("article#"+articleID+" .editor").notebook().on('contentChange', function(e) {
				var content = e.originalEvent.detail.content;
			});		
		}
	}
$(function() {
	Dropzone.autoDiscover = false;
	$("button.status.published").bind("click", function() {
		var articleID = $(this).removeClass("published").addClass("publish").unbind()
							 .parent().attr("id");
		setDraftMode.prepareDropZone(articleID);
		setDraftMode.prepareDeleteButton(articleID);
		setDraftMode.prepareNotebook(articleID);
	});
});