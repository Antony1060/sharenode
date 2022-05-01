const options = [{
    name: "i",
    argCount: 1
}]

/**
 * 
 * @param {Array<String>} argv
 * @returns {Map<String, String>} 
 */
module.exports = (argv) => {
    const args = argv.splice(2);
    const map = new Map();
    for(let arg of args) {
        if(!arg.startsWith("-")) continue;
        arg = arg.slice(1)
        const option = options.find(it => it.name === arg)
        if(!option) continue;

        const index = args.indexOf(`-${option.name}`)
        const argArr = args.splice(index, Math.min(option.argCount + 1, args.length - index)).splice(1);
        if(argArr.length < option.argCount) throw new Error(`Parsing error: Option ${arg} requires ${option.argCount} values`);
        let end = 0;
        for(; end < argArr.length; end++) if(argArr[end].startsWith("-")) break;
        argArr.splice(end, argArr.length);
        map.set(arg, argArr);
    }
    return map;
}