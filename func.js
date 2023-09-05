// an enumerated list of the seven main stats.
const stats = ['Power', 'Finesse', 'Insight', 'Charm', 'Arcane', 'Occult', 'Luck'];

// takes the sumStats generated, and updates the log accordingly.
function updateLog(sumStats) {
	var average = 49; // this is the average of 14 dice rolls, or 7 stats.
	var cong;
	if (sumStats > average + 6) {
		if (sumStats > average + 12) {
			cong = 'legendary';
		} else {
			cong = 'strong';
		}
	} else if (sumStats < average - 6) {
		if (sumStats < average - 12) {
			cong = 'sickly';
		} else {
			cong = 'weak';
		}
	} else {
		cong = 'average';
	}var highest = 0;
	var highestName = 0;
	for (const [ index, element ] of stats.entries()) {
		if (Number(document.getElementById(element).value) > highest) {
			highest = document.getElementById(element).value;
			highestName = index;
		}
	}
	const jobList = ["marauder, duelist, or mystic", "hunter, duelist, merchant, thief, or mystic", "hedgewitch or sage", "performer", "scholar", "occultist", "merchant"];
	document.getElementById("log").innerHTML = "Your stats add to " + sumStats + ". This character is " + cong + ".<br>Suggested job(s) are " + jobList[highestName] + ".";
}

// regenerates all 7 stats, using 2d6 each. calls updateLog.
function randomizeStats() {
	var sumStats = 0;
	for (const [ index, element ] of stats.entries()) {
		var k = Math.ceil(Math.random() * 6);
		var k2 = Math.ceil(Math.random() * 6);
		sumStats += k + k2;
		document.getElementById(element).value = k + k2;
	}
	updateStats();
	document.getElementById("statGen").disabled = true;
}
	
// updates job log to protect against reloads. Called on body load.
function bugFixFunction() {
	
	document.getElementById("job").value = "None";
	document.getElementById("jobLog").innerHTML = "";
	
	//document.getElementById("p").innerHTML = document.getElementById("job").value;
	//updateJobLog();
}

// changes a score value to a modifier value.
function scoreToMod(k) {
	// haven't tried this without Number() and don't care enough to see if it's necessary
	k = Number(k)
	switch (k) {
		case 2: return -4; break;
		case 3: return -3; break;
		case 4: return -2; break;
		case 5: return -1; break;
		case 6:case 7: case 8: return 0; break;
		case 9: return 1; break;
		case 10: return 2; break;
		case 11: return 3; break;
		case 12: return 4; break;
		default: break;
	}
	if (k < 2) {
		return "Too low!"
	}
	if (k > 12) {
		return (Math.floor(k / 2) - 2);
	}
}

// changes values to fit the max and min, and passes the new user-inputted information to updateLog.
function updateStats() {
	var sumStats = 0;
	for (const [ index, element ] of stats.entries()) {
		var k = Number(document.getElementById(element).value);
		if (k < 2) {
			k = 2;
			document.getElementById(element).value = k;
		}
		// if (k > 12) {
		//	k = 12;
		//	document.getElementById(element).value = k;
		// }
		sumStats += k;
		var element2 = element + "f";
		document.getElementById(element2).innerHTML = scoreToMod(k);
	}
	document.getElementById("Dodge").innerHTML = 8 + Number(document.getElementById("Finessef").innerHTML);
	document.getElementById("Hit").innerHTML = Number(document.getElementById("Powerf").innerHTML);
	updateLog(sumStats);
	updateSumHp();
}

// wipes all 7 stats. should be called when the body is loaded.
function clearLog() {
	for (const [ index, element ] of stats.entries()) {
		document.getElementById(element).value = null;
		document.getElementById(element).disabled = null;
		var element2 = element + "f";
		document.getElementById(element2).innerHTML = "";
	}
	document.getElementById("job").value = "None";
	document.getElementById("jobLog").innerHTML = "";
	document.getElementById("kindred").value = "None";
	document.getElementById("kinLog").innerHTML = "";
	document.getElementById("nationality").value = "None";
	document.getElementById("natLog").innerHTML = "";
	document.getElementById("log").innerHTML = null;
	document.getElementById("stat1").value = "None";
	document.getElementById("stat2").value = "None";
	document.getElementById("stat1").disabled = false;
	document.getElementById("stat2").disabled = false;
	document.getElementById("switchButton").disabled = false;
	document.getElementById("statGen").disabled = false;
	document.getElementById("statLock").disabled = false;
	document.getElementById("HealthDie").value = "";
	document.getElementById("p").innerHTML = "None";
	document.getElementById("Dodge").innerHTML = "";
	document.getElementById("sumHp").innerHTML = "";
	document.getElementById("Hit").innerHTML = "0";
}

// wipes all changeable items
function clearAll() {
	document.getElementById("stat1").value = "None";
	document.getElementById("stat2").value = "None";
	document.getElementById("kindred").value = "None";
	document.getElementById("gender").value = "None";
	document.getElementById("name").value = null;
	document.getElementById("nationality").value = "None";
	document.getElementById("job").value = "None";
	clearLog();
}

// gets the stats input in stat1 and stat2, and switches their values.
function switchStats() {
	var bite = document.getElementById("stat1").value;
	var bitten = document.getElementById("stat2").value;
	var hold = document.getElementById(bite).value;
	document.getElementById(bite).value = document.getElementById(bitten).value;
	document.getElementById(bitten).value = hold;
	document.getElementById("stat1").disabled = true;
	document.getElementById("stat2").disabled = true;
	document.getElementById("switchButton").disabled = true;
	updateStats();
	
}

// takes the value stored in the kin selector and generates lore text.
function updateKinLog() {
	var kin = document.getElementById("kindred").value;
	var output = "";
	switch (kin) {
		case "Animus":
			output = "Animated golems that take the shape of common ceramic items.";
			break;
		case "Beastkin":
			output = "Bipedal animal people based on any variety of land mammals and reptiles."
			break;
		case "Birdling":
			output = "Tall, flightless bird people.";
			break;
		case "Froglin":
			output = "Bipedal frog-folk that can change their gender after a long rest.";
			break;
		case "Gnome":
			output = "Short furry people with long tufted ears, rabbit-like noses, and protruding pointed canines.";
			break;
		case "Manling":
			output = "The human kind!";
			break;
		case "Mothma":
			output = "Quiet bipedal moth people with large eyes, fuzzy collars, and antennae.";
			break;
		case "Sylvan":
			output = "Blue skinned, pointy eared, short elven creatures with dense curly hair.";
			break;
		default:
			break;
	}
	
	document.getElementById("kinLog").innerHTML = output;
}

// takes the value stored in the nationality selector and generates lore text.
function updateNatLog() {
	var kin = document.getElementById("nationality").value;
	var output = "";
	switch (kin) {
		case "Forcosia":
			output = "Dense woodland with winding oaks and the Great Tree.";
			break;
		case "Frogland":
			output = "Distant land across the southern sea, from which warrior frogs make their pilgrimage.";
			break;
		case "Gobani":
			output = "Badlands, Arid Steppes, desert, tall mountains outside of the three kingdoms.";
			break;
		case "Luxion":
			output = "Land of the mothma, deep within caves and under mountains.";
			break;
		case "Polaris":
			output = "Frozen North, home to many astronomy towers for studying cosmic events.";
			break;
		case "The Great Swamp":
			output = "Dense swampland where no stonework can be built, home of Occult magic.";
			break;
		case "The Hills":
			output = "Known as Crosswind Vale, this is the pastoral home of many gnomes.";
			break;
		case "Three Kingdoms":
			output = "Central oligarchical kingdom with dense cityscapes and populated farmlands and forests, ruled by three distinct family houses.";
			break;
		default:
			break;
	}
	
	document.getElementById("natLog").innerHTML = output;
}

// takes the job from updateJobLog and removes the stats.
function addJobStats(job) {
	var pwr = 0;
	var fin = 0;
	var ins = 0;
	var chm = 0;
	var arc = 0;
	var occ = 0;
	var lck = 0;
	switch (job) {
		case "Duelist":
			pwr = 1;
			fin = 1;
			arc = -1;
			occ = -1;
			lck = 1;
			break;
		case "Hedgewitch":
			pwr = -2;
			ins = 2;
			chm = 1;
			arc = -2;
			lck = 1;
			break;
		case "Hunter":
			pwr = -1;
			fin = 2;
			ins = 1;
			occ = -2;
			lck = 1;
			break;
		case "Marauder":
			pwr = 2;
			fin = -1;
			ins = -1;
			chm = -2;
			arc = -1;
			break;
		case "Merchant":
			pwr = -3;
			fin = 1;
			chm = 1;
			lck = 2;
			break;
		case "Mystic":
			pwr = 1;
			fin = 2;
			ins = 1;
			arc = -1;
			occ = -1;
			break;
		case "Occultist":
			pwr = -1;
			fin = 1;
			ins = -2;
			chm = 1;
			occ = 2;
			lck = 1;
			break;
		case "Performer":
			pwr = -1;
			fin = 1;
			chm = 2;
			occ = -1;
			lck = 1;
			break;
		case "Sage":
			fin = -1;
			ins = 2;
			arc = -1;
			occ = -1;
			break;
		case "Scholar":
			pwr = -2;
			ins = -1;
			arc = 2;
			break;
		case "Thief":
			pwr = -3;
			fin = 2;
			lck = 2;
			break;
		default:
			break;
	}
	// I don't care enough to break this up into two methods. It would require seven parameters which is kinda icky.
	// so I've just inversed these signs for the neighbor method.
	document.getElementById("Power").value = Number(document.getElementById("Power").value) + pwr;
	document.getElementById("Finesse").value = Number(document.getElementById("Finesse").value) + fin;
	document.getElementById("Insight").value = Number(document.getElementById("Insight").value) + ins;
	document.getElementById("Charm").value = Number(document.getElementById("Charm").value) + chm;
	document.getElementById("Arcane").value = Number(document.getElementById("Arcane").value) + arc;
	document.getElementById("Occult").value = Number(document.getElementById("Occult").value) + occ;
	document.getElementById("Luck").value = Number(document.getElementById("Luck").value) + lck;
	updateStats();
}

// takes the job from updateJobLog and adds the stats.
function removeJobStats(job) {
	var pwr = 0;
	var fin = 0;
	var ins = 0;
	var chm = 0;
	var arc = 0;
	var occ = 0;
	var lck = 0;
	switch (job) {
		case "Duelist":
			pwr = 1;
			fin = 1;
			arc = -1;
			occ = -1;
			lck = 1;
			break;
		case "Hedgewitch":
			pwr = -2;
			ins = 2;
			chm = 	1;
			arc = -2;
			lck = 1;
			break;
		case "Hunter":
			pwr = -1;
			fin = 2;
			ins = 1;
			occ = -2;
			lck = 1;
			break;
		case "Marauder":
			pwr = 2;
			fin = -1;
			ins = -1;
			chm = -2;
			arc = -1;
			break;
		case "Merchant":
			pwr = -3;
			fin = 1;
			chm = 1;
			lck = 2;
			break;
		case "Mystic":
			pwr = 1;
			fin = 2;
			ins = 1;
			arc = -1;
			occ = -1;
			break;
		case "Occultist":
			pwr = -1;
			fin = 1;
			ins = -2;
			chm = 1;
			occ = 2;
			lck = 1;
			break;
		case "Performer":
			pwr = -1;
			fin = 1;
			chm = 2;
			occ = -1;
			lck = 1;
			break;
		case "Sage":
			fin = -1;
			ins = 2;
			arc = -1;
			occ = -1;
			break;
		case "Scholar":
			pwr = -2;
			ins = -1;
			arc = 2;
			break;
		case "Thief":
			pwr = -3;
			fin = 2;
			lck = 2;
			break;
		default:
			break;
	}
	document.getElementById("Power").value = Number(document.getElementById("Power").value) - pwr;
	document.getElementById("Finesse").value = Number(document.getElementById("Finesse").value) - fin;
	document.getElementById("Insight").value = Number(document.getElementById("Insight").value) - ins;
	document.getElementById("Charm").value = Number(document.getElementById("Charm").value) - chm;
	document.getElementById("Arcane").value = Number(document.getElementById("Arcane").value) - arc;
	document.getElementById("Occult").value = Number(document.getElementById("Occult").value) - occ;
	document.getElementById("Luck").value = Number(document.getElementById("Luck").value) - lck;
	updateStats();
}

// updates the lore in the jobLog.
function updateJobLog() {
	var job = document.getElementById("job").value;
	removeJobStats(document.getElementById("p").innerHTML);
	var output = "";
	switch (job) {
		case "Duelist":
			output = "Traveling duelist, blades expert.<br>+1 pwr, +1 fin, -1 arc, -1 occ, +1 lck";
			break;
		case "Hedgewitch":
			output = "Witch in training, who studies the natural ways of the world.<br>-2 pwr, +2 ins, +1 chm, -2 arc, +1 lck";
			break;
		case "Hunter":
			output = "Woodsman, forager, survivalist.<br>-1 pwr, +2 fin, +1 ins, -2 occ, +1 lck";
			break;
		case "Marauder":
			output = "Barbarian fighter, soldier, or warrior.<br>+2 pwr, -1 fin, -1 ins, -2 chm, -1 arc";
			break;
		case "Merchant":
			output = "Well traveled figure who starts with many items.<br>-3 pow, +1 fin, +1 chm, +2 lck";
			break;
		case "Mystic":
			output = " Mystic martial artist.<br>+1 pwr, +2 fin, +1 ins, -1 arc, -1 occ";
			break;
		case "Occultist":
			output = " Studies the darker magics and monsters, carries cursed trinkets.<br>-1 pwr, +1 fin, -2 ins, +1 chm, +2 occ, +1 lck";
			break;
		case "Performer":
			output = "Traveling troupe performer or solo artist.<br>-1 pwr, +1 fin, +2 chm, -1 occ, +1 lck";
			break;
		case "Sage":
			output = "Holy Priest or acolyte, often for a choice aspect of the Goddess.<br>-1 fin, +2 ins, -1 arc, -1 occ";
			break;
		case "Scholar":
			output = "Student of the arcane magics.<br>-2 pwr, -1 ins, +2 arc";
			break;
		case "Thief":
			output = "Nimble but fragile rogue.<br>-3 pwr, +2 fin, +2 lck";
			break;
		default:
			break;
	}
	addJobStats(job);
	document.getElementById("p").innerHTML = job;
	document.getElementById("jobLog").innerHTML = output;
}

// rolls 1d6, and updates the value stored in the max HP box.
function genHealth() {
	document.getElementById("HealthDie").value = Math.ceil(Math.random() * 6);
	updateSumHp();
}

// seals all seven stats.
function finishStats() {
	document.getElementById("Power").disabled = true;
	document.getElementById("Finesse").disabled = true;
	document.getElementById("Insight").disabled = true;
	document.getElementById("Charm").disabled = true;
	document.getElementById("Arcane").disabled = true;
	document.getElementById("Occult").disabled = true;
	document.getElementById("Luck").disabled = true;
	document.getElementById("statLock").disabled = true;
	document.getElementById("stat1").disabled = true;
	document.getElementById("stat2").disabled = true;
	document.getElementById("switchButton").disabled = true;
}

function updateSumHp() {
	document.getElementById("sumHp").innerHTML = Number(document.getElementById("HealthDie").value) + Number(document.getElementById("Hit").innerHTML);
	if (document.getElementById("sumHp").innerHTML < 1) {
		document.getElementById("sumHp").innerHTML = 1;
	}
}