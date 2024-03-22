const readline = require("readline");
const validator = require("validator");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getUserInfo() {
    
    function askQuestion(question, validatorFn, errorMessage, nextFunction) {
        rl.question(question, (answer) => {
            if (validatorFn == null || validatorFn(answer)) {
                nextFunction(answer);
            } else {
                console.log(errorMessage);
                askQuestion(question, validatorFn, errorMessage, nextFunction);
            }
        })
    }

    askQuestion(
        "What is your name? ",
        null,
        "Name: wrong format, your name must contain only alphabets",
        (name) => {
            askQuestion(
                "What is your phone number? ",
                (phoneNumber) => validator.isMobilePhone(phoneNumber, "id-ID"),
                "Phone number: wrong format, your phone number must be an Indonesian number",
                (phoneNumber) => {
                    askQuestion(
                        "What is your email? ",
                        validator.isEmail,
                        "Email: wrong format, enter input again!",
                        (email) => {
                            console.log(`Name: ${name}\n` +
                                        `Phone number: ${phoneNumber}\n` +
                                        `Email: ${email}`);

                            rl.close();
                        }
                    );
                }
            );
        }
    );
}

// export { getUserInfo };
module.exports = { getUserInfo };