function shuffleArray(array) {
	array.sort(() => Math.random() - 0.5);
}

const levels = [
	"level-2-1",
	"level-3-1",
	"level-4-1",
	"level-1-2",
	"level-2-2",
	"level-3-2",
	"level-4-2",
	"level-1-3",
	"level-2-3",
	"level-3-3",
	"level-4-3",
	"level-1-4",
	"level-2-4",
	"level-3-4",
	"level-4-4",
];

shuffleArray(levels);

const newGrid = `
'level-1-1 ${levels[0]} ${levels[1]} ${levels[2]}'
'${levels[3]} ${levels[4]} ${levels[5]} ${levels[6]}'
'${levels[7]} ${levels[8]} ${levels[9]} ${levels[10]}'
'${levels[11]} ${levels[12]} ${levels[13]} ${levels[14]}'
`;

document.querySelector("main").style.gridTemplateAreas = newGrid;

let characterChoice = prompt(`
    Vul één van onderstaande getallen in om een personage te kiezen:\n
    1 - Isaac
    2 - Magdalene
    3 - Cain
    4 - ???
    5 - Eve
    6 - Azazel
    7 - Lazarus
    8 - The Lost
    9 - Lilith
    10 - Apollyon
    11 - The Forgotten
    12 - Esau
    `);
    
    characterChoice = parseInt(characterChoice);
    let imageSrc = "";
    
    switch (characterChoice){
        case 1:
            imageSrc = "isaac.png";
        break;
        case 2:
            imageSrc = "magdalene.png";
        break;
        case 3:
            imageSrc = "tainted-cain.png";
        break;
        case 4:
            imageSrc = "blue-baby.png";
        break;
        case 5:
            imageSrc = "eve.png";
        break;
        case 6:
            imageSrc = "azazel.png";
        break;
        case 7:
            imageSrc = "lazarus-risen.png";
        break;
        case 8:
            imageSrc = "the-lost.png";
        break;
        case 9:
            imageSrc = "lilith.png";
        break;
        case 10:
            imageSrc = "apollyon.png";
        break;
        case 11:
            imageSrc = "the-forgotten.png";
        break;
        case 12:
            imageSrc = "esau.png";
        break;
        default:
            imageSrc = "isaac.png";
    }
    
    document.querySelector(".character > img").src = "images/characters/" + imageSrc;

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

    const verticallyVisible = rect.bottom > 0 && rect.top < windowHeight;
    const horizontallyVisible = rect.right > 0 && rect.left < windowWidth;

    return verticallyVisible && horizontallyVisible;
}

const treasureRoom = document.querySelector(".level-2-1");
const itemImg = document.querySelector(".inventory > img");

let wasInViewport = false;

window.addEventListener("scroll", () => {
	const currentlyInViewport = isInViewport(treasureRoom);

	if (currentlyInViewport && !wasInViewport) {
		const items = [
			"boomerang.png",
			"candle.png",
			"d20.png",
			"guppys-paw.png",
			"hourglass.png",
			"moms-shovel.png",
			"mystery-gift.png",
			"necronomicon.png"
		];

		const randomIndex = Math.floor(Math.random() * items.length);
		const selectedItem = items[randomIndex];

		itemImg.src = "images/items/" + selectedItem;
		itemImg.style.display = "block";
	}
	wasInViewport = currentlyInViewport;
});

//Spikeroom 
const spikeRoom = document.querySelector(".level-3-1");
const rainbow = document.querySelector(".level-3-2");
let wasInSpikeRoom = false;
let wasInRainbowRoom = false;
let health = 3;

window.addEventListener("scroll", () => {
    const isInSpikeRoom = isInViewport(spikeRoom);
    const isInRainbowRoom = isInViewport(rainbow);

    if (isInSpikeRoom && !wasInSpikeRoom) {
        health = health - 1;

        // Hide hearts accordingly
        if (health < 3) {
            document.querySelector(".health > img:nth-child(3)").style.display = "none";
        }
        if (health < 2) {
            document.querySelector(".health > img:nth-child(2)").style.display = "none";
        }
        if (health < 1) {
            document.querySelector(".health > img:nth-child(1)").style.display = "none";

            setTimeout(() => {
                alert("GAME OVER!");
            }, 500);

            setTimeout(() => {
                document.querySelector(".level-1-1").scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
            }, 1000);

            setTimeout(() => {
                health = 3;
                document.querySelector(".health > img:nth-child(1)").style.display = "inline";
                document.querySelector(".health > img:nth-child(2)").style.display = "inline";
                document.querySelector(".health > img:nth-child(3)").style.display = "inline";
                document.querySelector(".inventory > img").style.display = "none";
            }, 1500);
        }
    }
    wasInSpikeRoom = isInSpikeRoom;
    if(isInRainbowRoom && !wasInRainbowRoom){
        health = 3;
        document.querySelector(".health > img:nth-child(1)").style.display = "inline";
        document.querySelector(".health > img:nth-child(2)").style.display = "inline";
        document.querySelector(".health > img:nth-child(3)").style.display = "inline";   
    }
    wasInRainbowRoom = isInRainbowRoom;
});

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener("load", () => {
    setTimeout(() => {
        document.querySelector(".level-1-1").scrollIntoView({ behavior: "auto", block: "center", inline: "center" });
    }, 0);
});