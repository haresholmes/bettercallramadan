/**
 * BETTER CALL RAMADAN — INTERACTIVE FUNCTIONALITY
 * Handles bilingual switching (EN/AR), intake form preview builder, and tab selections.
 */

document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------------------------------
    // 1. Language Toggle System (Bilingual Mirroring)
    // ----------------------------------------------------
    const htmlTag = document.documentElement;
    const langToggleBtn = document.getElementById("lang-toggle");
    
    // Select all elements that require translation
    const translatableElements = document.querySelectorAll("[data-text-en]");

    langToggleBtn.addEventListener("click", () => {
        const currentLang = htmlTag.getAttribute("lang");
        const newLang = currentLang === "en" ? "ar" : "en";
        const isRtl = newLang === "ar";

        // Update HTML tag attributes for direction and language
        htmlTag.setAttribute("lang", newLang);
        htmlTag.setAttribute("dir", isRtl ? "rtl" : "ltr");

        // Update Toggle button label
        langToggleBtn.textContent = isRtl ? "EN" : "AR";

        // Loop through and swap text content or inputs
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
            setActiveCard(cardFounders, cardCorporate, "Founders & Creators");
        });

        cardCorporate.addEventListener("click", () => {
            setActiveCard(cardCorporate, cardFounders, "Corporations & Investors");
        });
    }

    // ----------------------------------------------------
    // 3. Intake Form "Case Profile Builder" (Live Update)
    // ----------------------------------------------------
    const trackRadios = intakeForm.querySelectorAll('input[name="focus_track"]');
    const urgencyRadios = intakeForm.querySelectorAll('input[name="urgency"]');
    const jurisdictionSelect = document.getElementById("jurisdiction-select");

    const sumTrack = document.getElementById("sum-track");
    const sumJurisdiction = document.getElementById("sum-jurisdiction");
    const sumUrgency = document.getElementById("sum-urgency");

    function updateCaseSummary() {
        const isAr = htmlTag.getAttribute("lang") === "ar";

        // Track Name
        const selectedTrack = intakeForm.querySelector('input[name="focus_track"]:checked').value;
        if (selectedTrack === "Founders & Creators") {
            sumTrack.textContent = isAr ? "المؤسسون والمبدعون" : "Founders & Creators";
        } else {
            sumTrack.textContent = isAr ? "الشركات والمستثمرون" : "Corporations & Investors";
        }

        // Jurisdiction
        const selectedJurisdiction = jurisdictionSelect.value;
        if (selectedJurisdiction.includes("DIFC")) {
            sumJurisdiction.textContent = isAr ? "مركز دبي المالي العالمي" : "DIFC Chambers";
        } else if (selectedJurisdiction.includes("ADGM")) {
            sumJurisdiction.textContent = isAr ? "سوق أبوظبي العالمي" : "ADGM Chambers";
        } else if (selectedJurisdiction.includes("Federal")) {
            sumJurisdiction.textContent = isAr ? "بر دبي الرئيسي" : "UAE Mainland";
        } else {
            sumJurisdiction.textContent = isAr ? "عابر للحدود" : "Cross-Border";
        }

        // Urgency
        const selectedUrgency = intakeForm.querySelector('input[name="urgency"]:checked').value;
        if (selectedUrgency.includes("Immediate")) {
            sumUrgency.textContent = isAr ? "إجراء عاجل (١-٧ أيام)" : "Immediate Action";
            sumUrgency.style.color = "var(--color-juniper)";
        } else {
            sumUrgency.textContent = isAr ? "تخطيط استراتيجي" : "Strategic Prep";
            sumUrgency.style.color = "var(--color-sage)";
        }
    }

    // Attach change listeners to form controls
    trackRadios.forEach(radio => radio.addEventListener("change", updateCaseSummary));
    urgencyRadios.forEach(radio => radio.addEventListener("change", updateCaseSummary));
    jurisdictionSelect.addEventListener("change", updateCaseSummary);

    // Run initial configuration
    updateCaseSummary();

    // Sync form radio back to cards highlight
    trackRadios.forEach(radio => {
        radio.addEventListener("change", (e) => {
            if (e.target.value === "Founders & Creators") {
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

        // Animate out form elements
        intakeForm.style.transition = "opacity 0.4s ease";
        intakeForm.style.opacity = "0";

        setTimeout(() => {
            intakeForm.style.display = "none";
            successNotification.style.display = "block";
            
            // Scroll subtly to notification
            successNotification.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 400);
    });
});
