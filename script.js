/**
 * MOHAMED RAMADAN — INTERACTIVE FUNCTIONALITY
 * Handles bilingual switching (EN/AR), intake form preview builder, and card selections.
 */

// ----------------------------------------------------
// GLOBAL PRODUCTION CONFIGURATION
// ----------------------------------------------------
const WHATSAPP_NUMBER = "971500000000"; // Replace with production WhatsApp number
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xkoazaap"; // Formspree ID

document.addEventListener("DOMContentLoaded", () => {
    // Dynamically set WhatsApp link on load
    const whatsappBtn = document.querySelector(".whatsapp-floating-btn");
    if (whatsappBtn) {
        whatsappBtn.href = `https://wa.me/${WHATSAPP_NUMBER}`;
    }

    // ----------------------------------------------------
    // 1. Language Toggle System (Bilingual Mirroring)
    // ----------------------------------------------------
    const htmlTag = document.documentElement;
    const langToggleBtn = document.getElementById("lang-toggle");
    
    // Select all elements that require translation
    const translatableElements = document.querySelectorAll("[data-text-en]");

    if (langToggleBtn) {
        langToggleBtn.addEventListener("click", () => {
            const currentLang = htmlTag.getAttribute("lang");
            const newLang = currentLang === "en" ? "ar" : "en";
            const isRtl = newLang === "ar";

            // Update HTML tag attributes for direction and language
            htmlTag.setAttribute("lang", newLang);
            htmlTag.setAttribute("dir", isRtl ? "rtl" : "ltr");

            // Update Toggle button label
            langToggleBtn.textContent = isRtl ? "EN" : "AR";

            // Loop through and swap text content or placeholders
            translatableElements.forEach(el => {
                const translation = isRtl ? el.getAttribute("data-text-ar") : el.getAttribute("data-text-en");
                
                if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
                    el.placeholder = translation;
                } else {
                    // If it contains a child with specific design structure, handle differently, else change text
                    const textOnlySpan = el.querySelector(".btn-text");
                    if (textOnlySpan) {
                        textOnlySpan.textContent = translation;
                    } else {
                        el.textContent = translation;
                    }
                }
            });

            // Update Briefing Desk Summary values after language toggle
            updateCaseSummary();
        });
    }

    // ----------------------------------------------------
    // 2. Audience Selector Interaction (Strategic Split)
    // ----------------------------------------------------
    const cardFounders = document.getElementById("card-founders");
    const cardCorporate = document.getElementById("card-corporate");
    const intakeForm = document.getElementById("intake-form");

    function setActiveCard(activeCard, inactiveCard, trackValue) {
        activeCard.classList.add("active");
        inactiveCard.classList.remove("active");
        
        // Find corresponding radio button in form and select it
        const radioButton = intakeForm.querySelector(`input[name="focus_track"][value="${trackValue}"]`);
        if (radioButton) {
            radioButton.checked = true;
            radioButton.dispatchEvent(new Event("change"));
        }
    }

    if (cardFounders && cardCorporate) {
        cardFounders.addEventListener("click", () => {
            setActiveCard(cardFounders, cardCorporate, "Commercial & Corporate");
        });

        cardCorporate.addEventListener("click", () => {
            setActiveCard(cardCorporate, cardFounders, "Disputes & Private Client");
        });
    }

    // ----------------------------------------------------
    // 3. Intake Form "Case Profile Builder" (Live Update)
    // ----------------------------------------------------
    const trackRadios = intakeForm.querySelectorAll('input[name="focus_track"]');
    const urgencyRadios = intakeForm.querySelectorAll('input[name="urgency"]');
    const matterSelect = document.getElementById("matter-select");

    const sumTrack = document.getElementById("sum-track");
    const sumMatter = document.getElementById("sum-matter");
    const sumUrgency = document.getElementById("sum-urgency");

    function updateCaseSummary() {
        const isAr = htmlTag.getAttribute("lang") === "ar";

        // 1. Focus Track Mapping
        const selectedTrackEl = intakeForm.querySelector('input[name="focus_track"]:checked');
        if (selectedTrackEl) {
            const selectedTrack = selectedTrackEl.value;
            if (selectedTrack === "Commercial & Corporate") {
                sumTrack.textContent = isAr ? "الشركات والقانون التجاري" : "Commercial & Corporate";
            } else {
                sumTrack.textContent = isAr ? "تسوية المنازعات والأفراد" : "Disputes & Private Client";
            }
        }

        // 2. Matter Type Mapping
        if (matterSelect) {
            const selectedMatter = matterSelect.value;
            if (selectedMatter === "Commercial Dispute") {
                sumMatter.textContent = isAr ? "نزاع تجاري" : "Commercial Dispute";
            } else if (selectedMatter === "Rental Dispute") {
                sumMatter.textContent = isAr ? "نزاع إيجاري" : "Rental Dispute";
            } else if (selectedMatter === "Corporate Matter") {
                sumMatter.textContent = isAr ? "شؤون الشركات" : "Corporate Matter";
            } else if (selectedMatter === "Execution Proceeding") {
                sumMatter.textContent = isAr ? "إجراءات تنفيذ" : "Execution Proceeding";
            } else if (selectedMatter === "Debt Recovery") {
                sumMatter.textContent = isAr ? "تحصيل ديون" : "Debt Recovery";
            } else if (selectedMatter === "Property Dispute") {
                sumMatter.textContent = isAr ? "نزاع عقاري" : "Property Dispute";
            } else if (selectedMatter === "Intellectual Property & Licensing") {
                sumMatter.textContent = isAr ? "الملكية الفكرية والتراخيص" : "Intellectual Property & Licensing";
            } else if (selectedMatter === "Employment & Labour Dispute") {
                sumMatter.textContent = isAr ? "نزاع العمل والتوظيف" : "Employment & Labour Dispute";
            } else {
                sumMatter.textContent = isAr ? "استشارة عامة" : "General Consultation";
            }
        }

        // 3. Urgency Mapping
        const selectedUrgencyEl = intakeForm.querySelector('input[name="urgency"]:checked');
        if (selectedUrgencyEl) {
            const selectedUrgency = selectedUrgencyEl.value;
            if (selectedUrgency.includes("Immediate")) {
                sumUrgency.textContent = isAr ? "إجراء عاجل" : "Immediate Action";
                sumUrgency.style.color = "var(--color-juniper)";
            } else {
                sumUrgency.textContent = isAr ? "تخطيط استراتيجي" : "Strategic Prep";
                sumUrgency.style.color = "var(--color-sage)";
            }
        }
    }

    // Attach change listeners to form controls
    trackRadios.forEach(radio => radio.addEventListener("change", updateCaseSummary));
    urgencyRadios.forEach(radio => radio.addEventListener("change", updateCaseSummary));
    if (matterSelect) {
        matterSelect.addEventListener("change", updateCaseSummary);
    }

    // Run initial configuration
    updateCaseSummary();

    // Sync form radio back to cards highlight
    trackRadios.forEach(radio => {
        radio.addEventListener("change", (e) => {
            if (e.target.value === "Commercial & Corporate") {
                cardFounders.classList.add("active");
                cardCorporate.classList.remove("active");
            } else {
                cardCorporate.classList.add("active");
                cardFounders.classList.remove("active");
            }
        });
    });

    // ----------------------------------------------------
    // 4. Form Submit & Success Transition
    // ----------------------------------------------------
    const successNotification = document.getElementById("success-notification");

    intakeForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(intakeForm);
        const errorNotification = document.getElementById("error-notification");
        
        // Reset previous alerts
        successNotification.style.display = "none";
        if (errorNotification) {
            errorNotification.style.display = "none";
        }

        // Fade form during submission process
        intakeForm.style.transition = "opacity 0.4s ease";
        intakeForm.style.opacity = "0.5";

        fetch(FORMSPREE_ENDPOINT, {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Successful submission
                setTimeout(() => {
                    intakeForm.style.display = "none";
                    successNotification.style.display = "block";
                    successNotification.scrollIntoView({ behavior: "smooth", block: "nearest" });
                }, 400);
            } else {
                // Server validation / response error
                throw new Error("Server responded with error status");
            }
        })
        .catch(err => {
            console.error("Formspree submission error:", err);
            // Restore form opacity and display error alert
            setTimeout(() => {
                intakeForm.style.opacity = "1";
                if (errorNotification) {
                    errorNotification.style.display = "block";
                    errorNotification.scrollIntoView({ behavior: "smooth", block: "nearest" });
                } else {
                    alert("Submission failed. Please try again.");
                }
            }, 400);
        });
    });
});
