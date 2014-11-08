var changeContent = function(agent, level, country, pushState) {
	url = "?agent=" + agent + "&level=" + level + "&country=" + country;
	$("#share").attr("href", url + "&share");
	$("#badge").attr("src","badge.php" + url);
	$("#dl").attr("href","badge.php" + url + "&dl");
	return url;
}

$(document).ready(function(){
	$("#agent, #country, #level").on("change, keyup", function(){
		var change = changeContent($("#agent").val(), $("#level").val(), $("#country").val());
		history.pushState(null, null, change);
	});

	$("#level").on("keyup change", function(){
		if (parseFloat($("#level").val()) > 16) {
			$("#level").val(16);
		}

		if (parseFloat($("#level").val()) < 1) {
			$("#level").val(1);
		}
	});

	changeContent($("#agent").val(), $("#level").val(), $("#country").val());
});
