// ==UserScript==
// @name         Flipped-Energy-Testing
// @namespace    https://github.com/flipped-energy/tamper-monkeys
// @version      1.0
// @description  Adds tools to help with testing
// @author       Flipped Energy Pty Ltd
// @match        http://localhost:8000/*
// @match        http://localhost:5274/*
// @match        http://0.0.0.0:5274/*
// @match        https://flipped.energy/*
// @match        https://home-dev.flipped.energy/*
// @match        https://home-pr.flipped.energy/*
// @match        https://home-uat.flipped.energy/*
// @match        https://home-staging.flipped.energy/*
// @match        https://home-prod.flipped.energy/*
// @match        https://home-production.flipped.energy/*
// @icon         https://flipped.energy/favicon.ico
// @grant        none
// @updateURL    https://raw.githubusercontent.com/flipped-energy/tamper-monkeys/refs/heads/main/scripts/flipped-energy-testing.js
// @downloadURL  https://raw.githubusercontent.com/flipped-energy/tamper-monkeys/refs/heads/main/scripts/flipped-energy-testing.js
// @require      https://esm.sh/@faker-js/faker

// ==/UserScript==

(function () {
  "use strict";

  console.log("Running flipped-userscripts");

  // Function to autofill the PR description
  function randomPerson() {
    // Find input boxes
    const inputs = {
      firstName: {
        type: "name",
        selector:
          "#gatsby-focus-wrapper > div > div > div.slide-root-cont.cms-y > div.BDWrapper.cms-y > div.BDWrapper.cms-y > div.slide-UserDetailsEntrySlide.cms-y > div > div > div > div > div:nth-child(1) > div.BDwrap.cms-x > div > div.cms-x.invalid.cms-x > input",
      },
    };
    // Loop through inputs and fill them with random data
    for (const input in inputs) {
      const element = document.querySelector(inputs[input].selector);
      if (element) {
        element.value = faker.name.firstName();
      } else {
        console.error("Could not find element for", input);
      }
    }
  }

  const newButton = `
<div class="BCDS-sc-j3mohh-0 bpCaty BDHeadWrap cms-y x-fill y-hug cms-a-C">
	<div class="BCDS-sc-j3mohh-0 fXYmXX  cms-y x-fill y-hug cms-a-N">
		<div class="Separator-sc-wjq3lq-1 fCa-Dbd">
			<svg xmlns="http://www.w3.org/2000/svg" height="4" width="100%" preserveAspectRatio="none" viewBox="0 0 100 4" fill="none">
				<path d="M0 2H100" stroke="#28D2CF" stroke-width="3">
				</path>
			</svg>
		</div>
		<h2 class="BaseText-sc-1oe6xum-0 H2Text-sc-1oe6xum-6 bMjWrF jUYYbR  cms-x x-fill y-hug">
			Test-Tools
		</h2>
		<div class="ButtonPanel-sc-wjq3lq-2 cCFYSn">
			<button onClick="randomPerson()" class="BaseContainerButtonStyled-sc-1rr5igv-0 hPgSAJ  cms-x x-fill y-hug cms-a-C">
				Random Person
			</button>
		</div>
	</div>
</div>

`;

  //Create the button from the html string
  const button = document.createElement("div");
  button.setHTMLUnsafe(newButton);

  // Add an event listener to the button to trigger the autofill function
  button.addEventListener("click", autofillPRDescription);

  // Append the button to the div.ActionBar-item-container
  const targetContainer = document.querySelector(
    "#gatsby-focus-wrapper > div > div > div.slide-root-cont.cms-y.x-fill.y-fill.cms-a-NW > div.BDWrapper.cms-y.x-fill.y-fill.cms-a-N"
  );
  if (targetContainer) {
    //Insert to first element
    // targetContainer.insertBefore(button, targetContainer.firstChild);
    //Inert to last element
    targetContainer.appendChild(button);

    console.log("Added", button);
  } else {
    console.error("Could not find the action bar container");
  }
})();
