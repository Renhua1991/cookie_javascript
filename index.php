<!DOCTYPE html> 
<html>
<head>
	<meta charset="UTF-8">
	<title>INFO/CS 2300 - HW1</title> 
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
	<?php 
		//Adds a JavaScript file or Stylesheet with a version based on the file modification time
		function add_versioned_file( $file, $type = 'JavaScript' ) {
			$mod_time = filemtime( $file );
			$url = "{$file}?ver=$mod_time";
			if( 'JavaScript' == $type ) {
				print( "<script src='$url'></script>" );
			} elseif( 'Style' == $type ) {
				print( "<link rel='stylesheet' href='$url'>" );
			}
		}
		add_versioned_file( 'js/script.js', 'JavaScript' );
		add_versioned_file( 'css/stylesheet.css', 'Style' );
	?>
</head>

<body>
	<div id="wrapper">
		<h1>Super Cool Javascript Text Editor</h1>
		<form id="controlForm" class="controls" action="index.php" method="post" onsubmit="return false;">
			<div id="color">
				<h2 class="test2">Font Color</h2>
				<label for="red">Red</label> 
				<input type="radio" name="color" value="Red" id="red" /><br />
				<label for="blue">Blue</label> 
				<input type="radio" name="color" value="Blue" id="blue" /><br />
				<label for="green">Green</label> 
				<input type="radio" name="color" value="Green" id="green" /><br />
			</div>
				
			<div>
				<h2>Text Display</h2>
				<!-- Giving specific names, then generic ones, is useful for font families
					because not everyone has every font. -->
				<input type="button" name="hideAll" value="Hide Descriptions"/><br/>
				<input type="button" name="showAll" value="Show Descriptions"/>
			</div>
			
			<div id="font">
				<h2>Font Size</h2>
				<input type="text" name="font" value="15" /> px
				<br /><span id="sizeWarning"></span>
			</div>
			
			<div>
				<h2>Image Altering</h2>
				<input type="button" name="pokemonReturn" value="Pokemon, Return!"/><br/>
				<input type="button" name="pokemonGo" value="Pokemon, Go!"/>
			</div>
			
			<div>
				<h2>Search Features [Already Implemented]</h2>
				<input id="search" type="text" name="search"/>
			</div>
			
			<div>
				<h2>Replace</h2>
				<table>
				<tr><td>Original: </td><td><input id="original" type="text" /></td></tr>
				<tr><td>New Text: </td><td><input id="newtext" type="text" /></td></tr>
				<tr><td colspan="2"><input id="replace" type="button" name="save" value="Replace" /></td></tr>
				</table>
			</div>

		</form>


		<form id="myform" class="test" action="saveFile.php" method="post">
		<div id="saveResult" class="saveResult">
			<input name="hiddentext" type="hidden" />
			<input name="settings" type="hidden" />
			<input name="savebutton" type="submit" value="Save file" />
		</div>
		</form>

		<div id="text">
			<h3>Pokedex</h3>
		<?php
			//reads in the file
			$file = file("pokedex.txt");
			
			foreach($file as $ind=>$line){
				$contains = stripos($line, "#");
				if ($contains === false) {
					echo "<p>".$line."</p><br/>";
				} else {
					$i = $ind / 2;
					echo "<div class = 'pokemon-wrapper' id = 'pokemon-".$i."'>";
					echo "<img src = 'img/pokemon-".$i.".jpg' class = 'pokedex-icon'/>";
					echo "<span>".$line."</span></div>";
				}
			}
			
		?>

		</div>
	</div>
</body>
</html>