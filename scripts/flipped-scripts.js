// ==UserScript==
// @name         Autofill PR
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Adds button to Autofill PR description with commit messages
// @author       Flipped Energy Pty Ltd
// @match        https://github.com/*/pull/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// @updateURL    https://raw.githubusercontent.com/flipped-energy/tamper-monkeys/main/scripts/flipped-scripts.js
// @downloadURL  https://raw.githubusercontent.com/flipped-energy/tamper-monkeys/main/scripts/flipped-scripts.js
// ==/UserScript==

(function () {
  "use strict";

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
  const button = document.createElement("button");
  button.textContent = "Autofill PR Description";
  button.style.marginLeft = "10px";
  button.className = "btn btn-primary";

  // Add an event listener to the button to trigger the autofill function
  button.addEventListener("click", autofillPRDescription);

  // Append the button to the div.ActionBar-item-container
  const actionBarContainer = document.querySelector(
    "div.ActionBar-item-container"
  );
  if (actionBarContainer) {
    actionBarContainer.appendChild(button);
  }
})();
