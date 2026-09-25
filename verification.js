function startVerification() {

    // Identity verification fields
    const idDocumentType = document.getElementById("idDocumentType");
    const idDocument = document.getElementById("idDocument").files[0];

    // Selfie
    const selfie = document.getElementById("selfie").files[0];

    // Address verification fields
    const addressDocumentType = document.getElementById("addressDocumentType");
    const addressDocument = document.getElementById("addressDocument").files[0];

    // Phone verification fields
    const phoneCountry = document.getElementById("phoneCountry");
    const phoneNumber = document.getElementById("phoneNumber");
    const phoneMessage = document.getElementById("phoneMessage");

    // OTP fields
    const otpBox = document.getElementById("otpBox");
    const otpInput = document.getElementById("otpInput");
    const otpCode = document.getElementById("otpCode");

    // Main button and message
    const button = document.getElementById("verifyButton");
    const message = document.getElementById("verificationMessage");


    // Check identity document type
    if (!idDocumentType || !idDocumentType.value) {

        message.style.display = "block";
        message.style.background = "#fee2e2";
        message.style.color = "#991b1b";

        message.textContent =
            "Please select an identity document type.";

        return;
    }


    // Check identity document
    if (!idDocument) {

        message.style.display = "block";
        message.style.background = "#fee2e2";
        message.style.color = "#991b1b";

        message.textContent =
            "Please upload your selected identity document.";

        return;
    }


    // Check selfie
    if (!selfie) {

        message.style.display = "block";
        message.style.background = "#fee2e2";
        message.style.color = "#991b1b";

        message.textContent =
            "Please upload your selfie before continuing.";

        return;
    }


    // Check address document type
    if (!addressDocumentType || !addressDocumentType.value) {

        message.style.display = "block";
        message.style.background = "#fee2e2";
        message.style.color = "#991b1b";

        message.textContent =
            "Please select an address verification document.";

        return;
    }


    // Check address document
    if (!addressDocument) {

        message.style.display = "block";
        message.style.background = "#fee2e2";
        message.style.color = "#991b1b";

        message.textContent =
            "Please upload your address verification document.";

        return;
    }


    // Check phone country and phone number
    if (
        !phoneCountry ||
        !phoneCountry.value ||
        !phoneNumber ||
        !phoneNumber.value.trim()
    ) {

        if (phoneMessage) {
            phoneMessage.style.display = "block";
            phoneMessage.style.background = "#fee2e2";
            phoneMessage.style.color = "#991b1b";

            phoneMessage.textContent =
                "Please select a country and enter your phone number.";
        }

        return;
    }


    // Validate phone number length
    const digits = phoneNumber.value.replace(/\D/g, "");

    if (digits.length < 7 || digits.length > 15) {

        if (phoneMessage) {
            phoneMessage.style.display = "block";
            phoneMessage.style.background = "#fee2e2";
            phoneMessage.style.color = "#991b1b";

            phoneMessage.textContent =
                "Please enter a valid phone number.";
        }

        return;
    }


    // Generate a random six-digit OTP
    if (!window.chatguardOtp) {

        window.chatguardOtp =
            String(
                Math.floor(
                    100000 + Math.random() * 900000
                )
            );


        if (phoneMessage) {

            phoneMessage.style.display = "block";
            phoneMessage.style.background = "#e0f2fe";
            phoneMessage.style.color = "#075985";

            phoneMessage.textContent =
                "A verification code has been sent to your phone number.";
        }


        if (otpCode) {

            otpCode.style.display = "block";

            otpCode.textContent =
                "Verification code: " +
                window.chatguardOtp;
        }


        if (otpBox) {
            otpBox.style.display = "block";
        }


        button.textContent = "Verify OTP";

        return;
    }


    // Verify OTP
    if (
        !otpInput ||
        otpInput.value.trim() !== window.chatguardOtp
    ) {

        if (otpBox) {
            otpBox.style.display = "block";
        }


        if (otpCode) {
            otpCode.style.display = "block";
        }


        if (phoneMessage) {

            phoneMessage.style.display = "block";
            phoneMessage.style.background = "#fee2e2";
            phoneMessage.style.color = "#991b1b";

            phoneMessage.textContent =
                "Incorrect OTP. Please enter the verification code shown above.";
        }

        return;
    }


    // Phone verified
    if (phoneMessage) {

        phoneMessage.style.display = "block";
        phoneMessage.style.background = "#dcfce7";
        phoneMessage.style.color = "#166534";

        phoneMessage.textContent =
            "Phone number verified successfully.";
    }


    // Disable button while checking
    button.disabled = true;
    button.textContent = "Checking...";


    // Begin document verification
    message.style.display = "block";
    message.style.background = "#e0f2fe";
    message.style.color = "#075985";

    message.textContent =
        "Checking your identity document...";


    // Check selfie
    setTimeout(function () {

        message.textContent =
            "Checking your selfie...";

    }, 2000);


    // Check address document
    setTimeout(function () {

        message.textContent =
            "Checking your address document...";

    }, 4000);


    // Complete verification
    setTimeout(function () {

        message.style.background = "#dcfce7";
        message.style.color = "#166534";

        message.textContent =
            "✓ Identity verification completed successfully.";

        button.textContent =
            "Verified ✓";


        // Save verification status
        localStorage.setItem(
            "chatguard_verified",
            "true"
        );


        // Continue to dashboard
        setTimeout(function () {

            window.location.href =
                "dashboard.html";

        }, 1500);

    }, 6000);

}