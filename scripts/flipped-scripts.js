// ==UserScript==
// @name         Autofill PR
// @namespace    https://github.com/flipped-energy/tamper-monkeys
// @version      1.3
// @description  Adds button to Autofill PR description with commit messages
// @author       Flipped Energy Pty Ltd
// @match        https://github.com/*/pull/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// @updateURL    https://raw.githubusercontent.com/flipped-energy/tamper-monkeys/refs/heads/main/scripts/flipped-scripts.js
// @downloadURL  https://raw.githubusercontent.com/flipped-energy/tamper-monkeys/refs/heads/main/scripts/flipped-scripts.js
// ==/UserScript==

(function () {
  "use strict";

  console.log("Running flipped-userscripts");

  // Function to autofill the PR description
  function autofillPRDescription() {
    // Select all elements with the class 'Link--primary text-bold'
    const commitElements = document.querySelectorAll(
      "a.Link--primary.text-bold"
    );

    // Extract the text content from each element and format it
    const commitMessages = Array.from(commitElements).map(
      (element) => `- ${element.textContent.trim()}`
    );

    // Join the formatted messages into a single string
    const formattedMessages = commitMessages.join("\n");

    // Select the pull request description textarea
    const prDescriptionTextarea = document.querySelector("#pull_request_body");

    // Append the formatted messages to the textarea
    if (prDescriptionTextarea) {
      prDescriptionTextarea.value += `\n\n${formattedMessages}`;
    }
  }

  // Create a button element
  // const button = document.createElement("button");
  const textContent = "Autofill PR Description";
  const style = "marginLeft: 10px;";
  const className = "btn btn-primary";

  const newButton = `
<div data-targets="action-bar.items" data-view-component="true" class="ActionBar-item"
style="visibility: visible;">
<button id="copilot-md-menu-anchor-pull_request_body" data-analytics-event="{&quot;category&quot;:&quot;comment_box&quot;,&quot;action&quot;:&quot;COPILOT&quot;,&quot;label&quot;:null}" aria-haspopup="true" aria-expanded="false" aria-labelledby="tooltip-bcb55a6b-e07b-4156-a477-130dc13bb051" type="button" data-view-component="true" class="Button Button--iconOnly Button--invisible Button--medium" tabindex="0">
<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-copilot Button-visual">

    <path d="M11.93 8.5a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5Zm-1.43-.75a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"></path>

</svg>

</button>
<tool-tip id="tooltip-bcb55a6b-e07b-4156-a477-130dc13bb051" for="copilot-md-menu-anchor-pull_request_body" popover="manual" data-direction="s" data-type="label" data-view-component="true" class="position-absolute sr-only" aria-hidden="true" role="tooltip" style="--tool-tip-position-top: 428px; --tool-tip-position-left: 664.390625px;">
${textContent}
</tool-tip>
</div>
`;

  //Create the button from the html string
  const button = document.createElement("div");
  button.setHTMLUnsafe(newButton);

  // Add an event listener to the button to trigger the autofill function
  button.addEventListener("click", autofillPRDescription);

  // Append the button to the div.ActionBar-item-container
  const actionBarContainer = document.querySelector(
    "div.ActionBar-item-container"
  );
  if (actionBarContainer) {
    //Insert to first element
    actionBarContainer.insertBefore(button, actionBarContainer.firstChild);
    console.log("Added", button);
  } else {
    console.error("Could not find the action bar container");
  }
})();
