"use strict";

// theme toggle button
const themeToggle = document.getElementById("themeToggle");

// swap dark/light
themeToggle.addEventListener("click", () => {
   document.body.classList.toggle("dark");
});


// product showcase section
const products = {
   1: {
      title: "Website Design",
      img: "img/webdesign.jpg",
      desc: "Custom fast sites for small businesses."
   },
   2: {
      title: "Branding",
      img: "img/branding.jpg",
      desc: "Logo design and brand identity."
   },
   3: {
      title: "IT Setup",
      img: "img/itsetup.jpg",
      desc: "Network configuration and hardware setup."
   }
};

//product DOM elements
const productBtns = document.querySelectorAll("#product-controls button");
const prodImg = document.getElementById("product-image");
const prodTitle = document.getElementById("product-title");
const prodDesc = document.getElementById("product-description");

// load chosen product
function loadProduct(id) {
   const p = products[id];
   prodImg.src = p.img;
   prodTitle.textContent = p.title;
   prodDesc.textContent = p.desc;

   // reset buttons and mark active
   productBtns.forEach(b => b.classList.remove("active"));
   document.querySelector(`[data-product="${id}"]`).classList.add("active");
}
// load first product on page load
loadProduct(1);

// wire up buttons
productBtns.forEach(btn => {
   btn.addEventListener("click", () => {
      loadProduct(btn.dataset.product);
   });
});


// guessing game elements + logic
const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const guessResult = document.getElementById("guessResult");
let lastNumber = null;
let winCount = 0; //track wins

// handle guess

guessBtn.addEventListener("click", () => {
   const val = Number(guessInput.value);

   if (!val || val < 1 || val > 10) {
      guessResult.textContent = "Enter a number between 1 and 10.";
      return;
   }
   //first number is random
   let comp;
   if (lastNumber === null) {
      comp = Math.floor(Math.random() * 10) + 1;
   } else {
      comp = lastNumber; //after that computer copies last number
   }
   guessResult.textContent = `You guessed ${val}, number was ${comp}.`;
   //correct guess
   if (val === comp) {
      winCount++;
      guessResult.textContent += "You got it!";

      if (winCount >= 10) {
         guessResult.textContent = "Want to try a different number?";
       } else if (winCount >= 3) {
            guessResult.textContent += " Wow, you must be psychic!";
         }
      } else {
         //wrong guess resets win count
         winCount = 0;
         guessResult.textContent += "Try again!";
      }  
   lastNumber = val;
});

// contact form validation and submission
const form = document.getElementById("contactForm");
const thankYou = document.getElementById("thankYouMessage");

form.addEventListener("submit", (e) => {
   e.preventDefault();

   // inputs
   const nm = document.getElementById("fullName");
   const ph = document.getElementById("phone");
   const em = document.getElementById("email");
   const cm = document.getElementById("comments");
   const pref = document.querySelector("input[name='pref']:checked");

   let errs = 0;

   // reset errors
   form.querySelectorAll(".errorMsg").forEach(m => m.textContent = "");
   form.querySelectorAll("input,textarea").forEach(n => n.classList.remove("error"));

   // name
   if (nm.value.trim().length < 1) {
      nm.classList.add("error");
      nm.nextElementSibling.textContent = "req";
      errs++;
   }

   // pref required
   if (!pref) {
      const prefErrorSpan = document
         .querySelector("input[name='pref']")
         .closest("div")
         .querySelector(".errorMsg");
      prefErrorSpan.textContent = "select one";
      errs++;
   }

   // regex bits
   const phoneRe = /^[0-9\-\s]{7,15}$/;
   const emailRe = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;

   // phone if they picked it
   if (pref && pref.value === "phone" && !phoneRe.test(ph.value)) {
      ph.classList.add("error");
      ph.nextElementSibling.textContent = "bad phone";
      errs++;
   }

   // email if they picked that
   if (pref && pref.value === "email" && !emailRe.test(em.value)) {
      em.classList.add("error");
      em.nextElementSibling.textContent = "bad email";
      errs++;
   }

   // comments
   if (cm.value.trim().length < 1) {
      cm.classList.add("error");
      cm.nextElementSibling.textContent = "required";
      errs++;
   }

   if (errs > 0) return;

   // customer obj
   const customer = {
      name: nm.value.trim(),
      phone: ph.value.trim(),
      email: em.value.trim(),
      pref: pref.value,
      comments: cm.value.trim()
   };

   // show msg
   thankYou.classList.remove("hide");
   thankYou.textContent = `Thank you ${customer.name}, I'll contact you by ${customer.pref}. at ${customer.pref === "phone" ? customer.phone : customer.email}.` +
      ` Your comments: "${customer.comments}" have been received.`;

   // reset form

   form.reset();
});
