document.addEventListener("DOMContentLoaded", function () {


    /* ==================================================
       PAGE LOADER
    ================================================== */

    const loader = document.getElementById("loader");

    if (loader) {

        window.addEventListener("load", function () {

            setTimeout(function () {

                loader.classList.add("hide");

            }, 500);

        });

    }


    /* ==================================================
       MOBILE MENU
    ================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const navMenu =
        document.getElementById("navMenu");


    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {

            navMenu.classList.toggle("show");

        });


        const navLinks =
            navMenu.querySelectorAll("a");


        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("show");

            });

        });

    }


    /* ==================================================
       SCROLL REVEAL
    ================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(

                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("visible");

                        }

                    });

                },

                {
                    threshold: 0.12
                }

            );


        revealElements.forEach(function (element) {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(function (element) {

            element.classList.add("visible");

        });

    }


    /* ==================================================
       WELLNESS LEARN MORE BUTTONS
    ================================================== */

    const learnButtons =
        document.querySelectorAll(".learn-more");


    learnButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const content =
                button.nextElementSibling;


            if (!content) {
                return;
            }


            content.classList.toggle("show");


            if (content.classList.contains("show")) {

                button.textContent =
                    "Show less −";

            } else {

                button.textContent =
                    "Learn more +";

            }

        });

    });


    /* ==================================================
       FAQ
    ================================================== */

    const faqQuestions =
        document.querySelectorAll(".faq-question");


    faqQuestions.forEach(function (question) {

        question.addEventListener("click", function () {

            const answer =
                question.nextElementSibling;


            if (!answer) {
                return;
            }


            answer.classList.toggle("show");


            const symbol =
                question.querySelector("span");


            if (symbol) {

                if (answer.classList.contains("show")) {

                    symbol.textContent = "−";

                } else {

                    symbol.textContent = "+";

                }

            }

        });

    });


    /* ==================================================
       BUTTON PRESS EFFECT
    ================================================== */

    const buttons =
        document.querySelectorAll(".btn");


    buttons.forEach(function (button) {

        button.addEventListener("mousedown", function () {

            button.style.transform =
                "scale(0.97)";

        });


        button.addEventListener("mouseup", function () {

            button.style.transform = "";

        });


        button.addEventListener("mouseleave", function () {

            button.style.transform = "";

        });

    });


    /* ==================================================
       ACTIVE NAVIGATION
    ================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop();


    const navLinks =
        document.querySelectorAll("nav a");


    navLinks.forEach(function (link) {

        const linkPage =
            link.getAttribute("href");


        if (linkPage === currentPage) {

            link.classList.add("active");

        }

    });


    /* ==================================================
       PREMIUM CONTACT FORM
    ================================================== */

    const contactForm =
        document.getElementById("contactForm");

    const formMessage =
        document.getElementById("formMessage");


    if (contactForm && formMessage) {


        contactForm.addEventListener(
            "submit",
            async function (event) {

                /* ------------------------------------------
                   STOP NORMAL FORMSPREE REDIRECT
                ------------------------------------------ */

                event.preventDefault();


                const submitButton =
                    contactForm.querySelector(
                        'button[type="submit"]'
                    );


                const nameInput =
                    document.getElementById("name");


                const emailInput =
                    document.getElementById("email");


                const messageInput =
                    document.getElementById("userMessage");


                /* ------------------------------------------
                   BASIC VALIDATION
                ------------------------------------------ */

                if (
                    !nameInput.value.trim() ||
                    !emailInput.value.trim() ||
                    !messageInput.value.trim()
                ) {

                    formMessage.className =
                        "form-error";

                    formMessage.innerHTML = `
                        <strong>
                            Almost there.
                        </strong>

                        <p>
                            Please complete all the fields
                            before sending your message.
                        </p>
                    `;

                    return;

                }


                /* ------------------------------------------
                   SAVE ORIGINAL BUTTON TEXT
                ------------------------------------------ */

                const originalButtonText =
                    submitButton.innerHTML;


                /* ------------------------------------------
                   SENDING STATE
                ------------------------------------------ */

                submitButton.disabled = true;

                submitButton.innerHTML =
                    "Sending...";


                contactForm.classList.add(
                    "is-sending"
                );


                formMessage.className = "";

                formMessage.innerHTML = "";


                /* ------------------------------------------
                   FORM DATA
                ------------------------------------------ */

                const formData =
                    new FormData(contactForm);


                try {

                    /* --------------------------------------
                       SEND TO FORMSPREE
                    -------------------------------------- */

                    const response =
                        await fetch(
                            contactForm.action,
                            {
                                method: "POST",
                                body: formData,
                                headers: {
                                    "Accept":
                                        "application/json"
                                }
                            }
                        );


                    /* --------------------------------------
                       SUCCESS
                    -------------------------------------- */

                    if (response.ok) {


                        const visitorName =
                            nameInput.value.trim();


                        /* ----------------------------------
                           HIDE FORM
                        ---------------------------------- */

                        contactForm.style.opacity = "0";

                        contactForm.style.transform =
                            "translateY(-12px)";


                        setTimeout(function () {

                            contactForm.style.display =
                                "none";


                            formMessage.className =
                                "form-success";


                            formMessage.innerHTML = `

                                <div class="success-icon">
                                    ✓
                                </div>

                                <div>

                                    <strong>
                                        You're all set,
                                        ${visitorName}.
                                    </strong>

                                    <p>
                                        Your message has been
                                        received successfully.
                                        I'll get back to you
                                        as soon as I can.
                                    </p>

                                    <button
                                        type="button"
                                        id="sendAnother"
                                        class="text-button">

                                        Send another message →

                                    </button>

                                </div>

                            `;


                            /* ------------------------------
                               SHOW SUCCESS
                            ------------------------------ */

                            formMessage.style.display =
                                "flex";


                        }, 400);


                    } else {


                        /* ----------------------------------
                           SERVER ERROR
                        ---------------------------------- */

                        formMessage.className =
                            "form-error";


                        formMessage.innerHTML = `

                            <strong>
                                We couldn't send your message.
                            </strong>

                            <p>
                                Please try again in a moment.
                            </p>

                        `;


                        submitButton.disabled =
                            false;


                        submitButton.innerHTML =
                            originalButtonText;


                        contactForm.classList.remove(
                            "is-sending"
                        );

                    }


                } catch (error) {


                    /* --------------------------------------
                       CONNECTION ERROR
                    -------------------------------------- */

                    formMessage.className =
                        "form-error";


                    formMessage.innerHTML = `

                        <strong>
                            Connection problem.
                        </strong>

                        <p>
                            Please check your internet
                            connection and try again.
                        </p>

                    `;


                    submitButton.disabled =
                        false;


                    submitButton.innerHTML =
                        originalButtonText;


                    contactForm.classList.remove(
                        "is-sending"
                    );

                }


            }
        );


        /* ==================================================
           SEND ANOTHER MESSAGE
        ================================================== */

        document.addEventListener(
            "click",
            function (event) {

                if (
                    event.target.id ===
                    "sendAnother"
                ) {


                    formMessage.style.opacity =
                        "0";


                    setTimeout(function () {

                        formMessage.className = "";

                        formMessage.innerHTML = "";

                        formMessage.style.display =
                            "none";


                        contactForm.reset();

                        contactForm.style.display =
                            "block";


                        contactForm.style.opacity =
                            "0";


                        contactForm.style.transform =
                            "translateY(12px)";


                        contactForm.classList.remove(
                            "is-sending"
                        );


                        const submitButton =
                            contactForm.querySelector(
                                'button[type="submit"]'
                            );


                        submitButton.disabled =
                            false;


                        submitButton.innerHTML =
                            "Send Message →";


                        setTimeout(function () {

                            contactForm.style.opacity =
                                "1";

                            contactForm.style.transform =
                                "translateY(0)";

                        }, 50);


                    }, 300);

                }

            }
        );

    }


});