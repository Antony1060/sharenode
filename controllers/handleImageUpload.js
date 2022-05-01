const fs = require("fs");
const FormData = require("form-data");
const clipboardy = require("clipboardy");
const getValue = require("get-value");
const exec = require("child_process").exec;

const { imageUpload } = require("../config.json");
const { default: axios } = require("axios");

/**
 * 
 * @param {Array<String>} argResponse 
 */
module.exports = async (argResponse) => {
    const imagePath = argResponse[0];
    
    const requestData = imageUpload.request;

    const fileBuf = await fs.promises.readFile(imagePath);

    const formData = new FormData();
    formData.append(requestData.formFileKey, fileBuf, "uploaded.png");

    const response = await axios(requestData.url, {
        method: requestData.method,
        headers: {
            "Content-Type": "multipart/form-data",
            ...requestData.headers
        },
        data: formData
    }).catch(console.error);

    const copyLink = getValue(response.data, imageUpload.response.json.copyLink);
    if(!copyLink) throw new Error(`Upload error: Couldn't find ${imageUpload.response.json.copyLink} in response json`)
    clipboardy.writeSync(copyLink);
    
    exec(`notify-send -a AShareNode -i ~/.face "Upload done" "Copied ${response.data.data.hash} to clipboard"`);
}