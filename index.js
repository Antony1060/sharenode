#!/usr/bin/node
const parseArgs = require("./utils/parseArgs");
const handleImageUpload = require("./controllers/handleImageUpload");

(async () => {
    const argMap = parseArgs(process.argv);

    if(argMap.has("i")) {
        handleImageUpload(argMap.get("i"))
    }
})()
