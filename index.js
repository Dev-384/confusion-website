import packageJSON from "/package.json" with {type: "json"};
import { reloadTemplateElements } from "https://waitimconfused.github.io/confusion-projects/components/index-module.js";

await reloadTemplateElements();

var animateThemeChange = true;

const nav = document.querySelector("nav");
const navMenu = document.querySelector("nav .menu");
const navMenuToggle = document.querySelector("nav .menu .icon-burger_menu");
const navLinks = document.querySelector("nav .links");
const themeToggleButton = document.getElementById("theme-toggle");
const metaThemeColour = document.createElement("meta");

const banner = new class Banner {
	content = "";
	colour = "accent";

	constructor() {
		this.setColour("accent");
	}

	show(skipAnimation=false) {
		if (this.content == "") return;
		if (skipAnimation || window.scrollY > 10) {
			document.querySelector("nav .banner").style.transitionDuration = "0ms";
			document.querySelector("nav").style.transitionDuration = "0ms";
			setTimeout(() => {
				document.querySelector("nav .banner").style.transitionDuration = null;
				document.querySelector("nav").style.transitionDuration = null;
			}, 450);
		}
		document.querySelector("nav .banner").classList.add("show");
	}
	hide() {
		document.querySelector("nav .banner").classList.remove("show");
	}
	toggle() {
		if (this.content == "") return;
		document.querySelector("nav .banner").classList.toggle("show");
	}
	setContent(text="") {
		this.content = text;
		document.querySelector("nav .banner").innerHTML = `<p>${this.content}</p>`;
		this.show();
	}
	setColour(colour="") {
		document.querySelector("nav .banner").style.backgroundColor = `var(--${colour})`;
		this.colour = colour;
	}
}

if (packageJSON?.banner) {
	let bannerText = packageJSON.banner;
	bannerText = bannerText.replaceAll("\t", " <span style='margin-left: 1rem'></span> ");
	bannerText = bannerText.replaceAll(/\*\*(.+?)\*\*/gm, "<strong>$1</strong>");
	bannerText = bannerText.replaceAll("\n", " — ");
	bannerText = bannerText.replaceAll(/\[(.+?)\]\((.+?)\)/gm, "<a href='$2'>$1</a>");
	banner.setContent(bannerText);
	banner.setColour("accent");
	banner.show(true);
}

document.querySelector("nav .sitename").onmouseenter = (e) => {
	document.querySelector("nav .sitename .img").classList.add("animate");
}
document.querySelector("nav .sitename").onmouseleave = (e) => {
	document.querySelector("nav .sitename .img").classList.remove("animate");
}

function getPreferredColorScheme() {
	if (window.matchMedia) {
		if(window.matchMedia('(prefers-color-scheme: dark)').matches){
			return 'dark';
		} else {
			return 'light';
		}
	}
	return 'light';
}

document.documentElement.setAttribute("data-theme", localStorage.getItem("theme") || getPreferredColorScheme());
localStorage.setItem("theme", document.documentElement.getAttribute("data-theme"));
document.body.querySelector(`#theme-toggle > [data-theme=${localStorage.getItem("theme")}]`).classList.add("hide");

metaThemeColour.name = "theme-color";
metaThemeColour.content = getComputedStyle(document.documentElement).getPropertyValue('--background');
document.head.appendChild(metaThemeColour);

document.onscroll = (e) => {

	navLinks.classList.remove("show");

	if (banner.content) {
		if ( window.scrollY > 10 ) {
			document.querySelector("nav").classList.add("scroll");
		} else {
			document.querySelector("nav").classList.remove("scroll");
		}
	}
}
// window.onresize = () => {
// 	document.querySelector("header .explode").style.setProperty("--window-width", window.innerWidth)
// }
// window.onresize();

function toggleTheme() {
	let theme = localStorage.getItem("theme");
	theme = (theme=="light")?"dark":"light";

	document.body.querySelector(`#theme-toggle > :not([data-theme=${theme}])`).classList.remove("hide");
	document.body.querySelector(`#theme-toggle > [data-theme=${theme}]`).classList.add("hide");

	if (animateThemeChange) {
		themeToggleButton.onclick = () => {};

		document.body.querySelector(`div#theme-change-cover`).setAttribute("theme-to", theme);
		document.body.querySelector(`div#theme-change-cover`).classList.add("animate");

		setTimeout(() => {
			document.documentElement.setAttribute("data-theme", theme);
			localStorage.setItem("theme", theme);
			metaThemeColour.content = getComputedStyle(document.documentElement).getPropertyValue('--background');
		}, 500);

		setTimeout(() => {
			document.body.querySelector(`div#theme-change-cover`).classList.remove("animate");
			document.body.querySelector(`div#theme-change-cover`).removeAttribute("theme-to");
			themeToggleButton.onclick = toggleTheme;
		}, 1000);
	} else {
		document.documentElement.setAttribute("data-theme", theme);
		localStorage.setItem("theme", theme);
		metaThemeColour.content = getComputedStyle(document.documentElement).getPropertyValue('--background');
	}
}

themeToggleButton.onclick = toggleTheme;

let documentLinks_scrollToID = document.querySelectorAll("a[href^='#']");
for (let i = 0; i < documentLinks_scrollToID.length; i ++) {
	let element = documentLinks_scrollToID[i];
	let id = element.href.split("#")[1];
	let linkedElement = document.querySelector(`#${id}`);
	element.removeAttribute("href");
	element.classList.add("clickable");
	// element.setAttribute("onclick", `document.querySelector("#${id}").scrollIntoView()`);
	element.onclick = () => {
		linkedElement.scrollIntoView();
	}
}

navMenuToggle.onclick = () => {
	navLinks.classList.toggle("show");
}

window.onresize = () => {
	if (window.innerWidth >= 700) {
		navLinks.classList.remove("show");
		navLinks.appendChild(themeToggleButton);
	} else {
		navMenu.prepend(themeToggleButton);
	}
}
window.onresize();