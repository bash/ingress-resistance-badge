<?php $share = isset($_GET['share']);
function getCurrentServer() {
	$serv = str_replace("//", "/", $_SERVER['HTTP_HOST'] . dirname($_SERVER['PHP_SELF']));
	if (substr($serv, -1) === "/") {
		$serv = substr($serv, 0, -1);
	}
	return "http://" . $serv;
}
?>
<!DOCTYPE html>
<html>
<head>
	<title>My Resistance Badge</title>
	<link rel="stylesheet" href="css/main.css">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<link href='http://fonts.googleapis.com/css?family=Coda' rel='stylesheet' type='text/css'>
	<link rel="shortcut icon" href="fav.png">

	<meta itemprop="name" content="<?=($_GET['agent'] ?: "My Resistance Badge")?>">
	<meta name="description" content="Get your Ingress Resistance Badge">
	<meta itemprop="image" content="<?=getCurrentServer()?>/badge.php?agent=<?=$_GET['agent']?>&level=<?=$_GET['level']?>&country=<?=$_GET['country']?>">
	<meta property="og:title" content="<?=($_GET['agent'] ?: "My Resistance Badge")?>"/>
	<meta property="og:image" content="<?=getCurrentServer()?>/badge.php?agent=<?=$_GET['agent']?>&level=<?=$_GET['level']?>&country=<?=$_GET['country']?>"/>

	<script src="//code.jquery.com/jquery-1.10.2.min.js"></script>
	<script src="js/main.js"></script>
</head>
<body>
	<div id="left">
	<?php if ($share): ?>
	<script>
		$(document).ready(function(){
			changeContent("<?=$_GET['agent']?>", "<?=$_GET['level']?>", "<?=$_GET['country']?>", false);
		});
	</script>
	<h2>This is my resistance badge:</h2>
		<p>Share this URL with your friends, to show them your badge.</p>
		<br /><br />
		<a class="button" href="./">Create your own</a>
	<?php else: ?>
		<h2>Hi, you can create your Resistance badge here.</h2>
		<input type="text" placeholder="username" id="agent" value="<?=$_GET['agent']?>">
		<input type="number" placeholder="level" id="level" value="<?=$_GET['level']?>">
		<br />
		<input type="text" placeholder="country" id="country" value="<?=$_GET['country']?>">
		<br />
		<a class="button" href="" id="share">Share</a>
	<?php endif; ?>
	<input type="button" value="Print" onclick="print();">

	<a class="button" href="" id="dl">Download</a>

	<br /><br />
	<p>The template for this badge can be found <a href="http://misteralex.deviantart.com/art/Ingress-Agent-Badge-Template-Vector-366658474" target="_blank">here</a></p>
	<p>Coded by <a href="http://fog.im/@ruby" target="_blank"><span class="nickname">@AgentRuby</span></a> </p>
	</div>

	<div id="right">
		<img id="badge">
	</div>
</body>
</html>
