var	postCount,
	currentPostIndex = 1,
	animationLength = 300,
	articlePath = "#article-container article",
	articleHash = window.location.hash,
	setHashTimeout,
	getPostIndex = function(hash) {
		return $(articlePath + hash).index() + 1;
	}
	goToPostIndex = function(index) {
		currentPostIndex = index;
		$("#article-wrapper").scrollTop(0);
		$(articlePath + ".adjacent").unbind("click");
		$(articlePath).removeClass("adjacent")
					  .removeClass("current");
		$(articlePath + ":nth-child(" + (index+1) + ")").addClass("adjacent").bind("click", function() {
			goToPostIndex(index+1);
		});
		$(articlePath + ":nth-child(" + (index-1) + ")").addClass("adjacent").bind("click", function() {
			goToPostIndex(index-1);
		});
		$("#article-container").removeClass("edge-left")
							   .removeClass("edge-right");
		if (typeof setHashTimeout !== "undefined"){
  			clearTimeout(setHashTimeout);
		}
		articleHash = $(articlePath + ":nth-child(" + index + ")").addClass("current").attr("id");
		if (!articleHash) {
			articleHash = "";
		}
		setHashTimeout = setTimeout(function() {
			window.location.hash = articleHash;
		}, animationLength);
		if (index == postCount && postCount > 1) {
			$("#article-container").addClass("edge-right");
		} else if (index == 1 && postCount > 1) {
			$("#article-container").addClass("edge-left");
		}
	}
$(function() {
	postCount = $(articlePath).length;
	if (articleHash !== "" && $(articlePath + articleHash).length > 0) {
		goToPostIndex(getPostIndex(articleHash));
	} else {
		goToPostIndex(currentPostIndex);
	}
	setTimeout(function() {
		$("#article-container").addClass("ready");
	}, animationLength);
	if ($("html").hasClass("touch")) {
		$("#article-container").swipe({
			allowPageScroll: "vertical",
			swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
				switch(direction) {
					case "right":
						if (currentPostIndex > 1) {
							goToPostIndex(currentPostIndex-1);
						}
						break;
					case "left":
						if (currentPostIndex <= postCount-1) {
							goToPostIndex(currentPostIndex+1);
						}					
						break;
					default: return;
				}
			}
		});
	}
	$("article nav a").click(function() {
		goToPostIndex(getPostIndex($(this).attr("data")));
	});
	$(document).keydown(function(e) {
		if (!$(e.target).is('.editor')) {
			switch(e.which) {
				case 37: // left
					if (currentPostIndex > 1) {
						goToPostIndex(currentPostIndex-1);
					}
					break;
				case 39: // right
					if (currentPostIndex <= postCount-1) {
						goToPostIndex(currentPostIndex+1);
					}
					break;
				default: return; // exit this handler for other keys
			}
			e.preventDefault(); // prevent the default action (scroll / move caret)
		}
	});
});