import 'dotenv/config';
import {sha512} from "js-sha512";
import axios from "axios";

const courseId = process.env.COURSE_ID;
const apiKey = process.env.PUBLIC_KEY;
const apiKeySecret = process.env.PRIVATE_KEY;
const actTimestamp = Math.floor(Date.now()/1000).toString();
const apiUrl = "https://testnutzen.blink.it/" + "api/v2/external/";
const actHash = sha512("==" + actTimestamp + "=" + apiKey + "=" + apiKeySecret + "==");

main();

async function main() {
    const res = await axios.get(`${apiUrl}/course/${courseId}/member`, {
        params: {
            apikey: apiKey,
            timestamp: actTimestamp,
            hash: actHash
        },
        headers: {
            contentType: "application/json; charset=UTF-8"
        }
    })
    printMembersToConsole(res.data);
}

function printMembersToConsole(members: []) {
    // tslint:disable-next-line:no-console
    console.log(`Dies sind die Teilnehmer für den Kurs mit der ID: ${courseId}`);
    // tslint:disable-next-line:no-console
    console.log(members);
    // tslint:disable-next-line:no-console
    console.log("Damit dürfte ich den Einstellungstest bestanden haben. Ich freue mich auf ein persönliches Gespräch :)");
}

